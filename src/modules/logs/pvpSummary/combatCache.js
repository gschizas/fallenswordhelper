import combatView from '../../ajax/combatView';
import createDocument from '../../system/createDocument';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import {nowSecs} from '../../support/now';
import parseDateAsTimestamp from '../../system/parseDateAsTimestamp';
import partial from '../../common/partial';
import querySelectorAll from '../../common/querySelectorAll';
import {sendEvent} from '../../support/fshGa';
import specials from '../../support/specials.json';
import {get, set} from 'idb-keyval';

export let combatCache = {};

function currentCombatRecord(data, combatId, sevenDays) {
  return combatId === 'lastCheck' || data[combatId].logTime &&
    data[combatId].logTime > sevenDays;
}

function keepRecent(data, sevenDays, prev, combatId) {
  if (currentCombatRecord(data, combatId, sevenDays)) {
    prev[combatId] = data[combatId];
  }
  return prev;
}

function cleanCache(data) {
  var sevenDays = nowSecs - 7 * 24 * 60 * 60;
  combatCache = Object.keys(data)
    .reduce(partial(keepRecent, data, sevenDays), {});
  combatCache.lastCheck = nowSecs;
  set('fsh_pvpCombat', combatCache);
}

function prepareCache(data) {
  var oneDay = nowSecs - 24 * 60 * 60;
  if (!data.lastCheck || data.lastCheck < oneDay) {
    cleanCache(data);
  } else {
    combatCache = data;
  }
}

function checkCache(data) {
  if (data) {prepareCache(data);}
}

export function initCache() {
  return get('fsh_pvpCombat').then(checkCache);
}

function inSpecialsList(el) {
  return el.id in specials;
}

function check(specialHtml, el, i) {
  if (!inSpecialsList(el)) {
    var label = JSON.stringify(el) + ' ' + getText(specialHtml[i]);
    //#if _DEV  //  PvP missing Special
    console.log(label); // eslint-disable-line no-console
    //#endif
    sendEvent('Logs', 'Missing PvP Special', label);
  }
}

function whatsMissing(json, html) {
  var specialHtml = querySelectorAll('#specialsDiv', createDocument(html));
  json.r.specials.forEach(partial(check, specialHtml));
}

function unknownSpecials(json) {
  if (!json.r.specials.every(inSpecialsList)) {
    combatView(json.r.id).then(partial(whatsMissing, json));
  }
}

export function cacheCombat(aRow, json) {
  if (json.s) {
    json.logTime = parseDateAsTimestamp(getTextTrim(aRow.cells[1])) / 1000;
    combatCache[json.r.id] = json;
    set('fsh_pvpCombat', combatCache);
    unknownSpecials(json);
  }
  return json;
}
