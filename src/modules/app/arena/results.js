import arena from './arena';
import {entries} from '../../common/entries';
import {nowSecs} from '../../support/now';
import partial from '../../common/partial';
import {get, set} from 'idb-keyval';

let resultsPromise;
let resultsCache;

function currentCombatRecord(combatId, obj, sevenDays) {
  return combatId === 'lastCheck' || obj.logTime && obj.logTime > sevenDays;
}

function keepRecent(sevenDays, prev, [combatId, obj]) {
  if (currentCombatRecord(combatId, obj, sevenDays)) {
    prev[combatId] = obj;
  }
  return prev;
}

function cleanCache(data) {
  const thirtyDays = nowSecs - 30 * 24 * 60 * 60;
  return entries(data)
    .reduce(partial(keepRecent, thirtyDays), {lastCheck: nowSecs});
}

function prepareCache(data) {
  const oneDay = nowSecs - 24 * 60 * 60;
  if (!data.lastCheck || data.lastCheck < oneDay) {
    return cleanCache(data);
  }
  return data;
}

async function initCache() {
  const cache = await get('fsh_arenaResults');
  if (cache) {
    resultsCache = prepareCache(cache);
    set('fsh_arenaResults', resultsCache);
  } else {
    resultsCache = {lastCheck: nowSecs};
  }
}

async function useApi(pvpId) {
  const json = await arena({subcmd: 'results', pvp_id: pvpId});
  if (json.s) {
    json.logTime = nowSecs;
    resultsCache[pvpId] = json;
    set('fsh_arenaResults', resultsCache);
  }
  return json;
}

function returnResults(pvpId) {
  if (resultsCache[pvpId]) {return resultsCache[pvpId];}
  return useApi(pvpId);
}

export default function results(pvpId) {
  if (!resultsPromise) {resultsPromise = initCache();}
  return resultsPromise.then(partial(returnResults, pvpId));
}
