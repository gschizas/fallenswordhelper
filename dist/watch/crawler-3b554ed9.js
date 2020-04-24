import { ay as nowSecs, q as entries, u as partial, ai as get, aj as set, by as createAnchor, i as insertElement, p as pCC } from './calfSystem-69cf053a.js';
import './numberIsNaN-4a77fba0.js';
import { r as round } from './round-7f21a1bb.js';
import './toLowerCase-2962b55d.js';
import './isDate-a4e6b49a.js';
import { c as createBr } from './createBr-301e2dc1.js';
import { a as all } from './all-0cd3fb64.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-9488a9d0.js';
import { a as arena } from './arena-4309bfb4.js';
import { f as fromEntries } from './fromEntries-62e1ddaf.js';
import { f as formatUtcDateTime } from './formatUtcDateTime-3f02fcdb.js';

function completed() {
  return arena({
    subcmd: 'completed',
    arena_id: -1,
    latest: false,
    limit: 9999,
  });
}

let resultsPromise;
let resultsCache;

function currentCombatRecord(combatId, obj, sevenDays) {
  return combatId === 'lastCheck' || (obj.logTime && obj.logTime > sevenDays);
}

function keepRecent(sevenDays, acc, [combatId, obj]) {
  if (currentCombatRecord(combatId, obj, sevenDays)) {
    acc[combatId] = obj;
  }
  return acc;
}

function cleanCache(data) {
  const thirtyDays = nowSecs - 30 * 24 * 60 * 60;
  return entries(data)
    .reduce(partial(keepRecent, thirtyDays), { lastCheck: nowSecs }); // FIXME
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
    resultsCache = { lastCheck: nowSecs };
  }
}

async function useApi(pvpId) {
  const json = await arena({ subcmd: 'results', pvp_id: pvpId });
  if (json.s) {
    json.logTime = nowSecs;
    resultsCache[pvpId] = json;
    set('fsh_arenaResults', resultsCache);
  }
  return json;
}

function returnResults(pvpId) {
  if (resultsCache[pvpId]) { return resultsCache[pvpId]; }
  return useApi(pvpId);
}

function results(pvpId) {
  if (!resultsPromise) { resultsPromise = initCache(); }
  return resultsPromise.then(partial(returnResults, pvpId));
}

const tabDelimited = (s, a) => s.concat(a.join('\t'), '\n');
const byWins = (a, b) => b[2] - a[2] || b[1] - a[1];
const addWinners = (arenaWinners, [name, entered]) => [name, entered, arenaWinners[name] || 0];

function calcRatio(dividend, divisor) {
  let ratio = 0;
  if (divisor !== 0) { ratio = round(dividend / divisor, 3); }
  return ratio;
}

const addRatio = ([name, entered, wins]) => [name, entered, wins, calcRatio(wins, entered)];

function findWinner(result) {
  const lastBattle = result.r[result.r.length - 1];
  if (lastBattle.attacker_win) {
    return lastBattle.attacker.name;
  }
  return lastBattle.defender.name;
}

async function getWinner(id) {
  const thisResult = await results(id);
  return [id, findWinner(thisResult)];
}

function makeDownloadAnchor(output, type, filename, text) {
  const blob = new Blob([output], { type });
  const url = URL.createObjectURL(blob);
  const anchor = createAnchor({
    download: filename,
    href: url,
    textContent: text,
  });
  insertElement(pCC, anchor);
  insertElement(pCC, createBr());
}

// function makeArenaWins(typeWins) {
//   const sorted = typeWins.sort((a, b) => b[7] - a[7]);
//   const csv = sorted.reduce(tabDelimited,
//     'player\ttotal entered\ttotal won\tnovice entered\tnovice won\t' +
//     'novice ratio\tstandard entered\tstandard won\tstandard ratio\t' +
//     'basic entered\tbasic won\tbasic ratio\tmoves entered\tmoves won\t' +
//     'moves ratio\n');
//   makeDownloadAnchor(csv,
//     'text/plain', 'arena_wins.txt', 'arena_wins');
// }

const joinedFields = ['pvpId', 'joinDate', 'helmet', 'armor', 'gloves', 'boots',
  'weapon', 'shield', 'ring', 'amulet', 'rune', 'stat_attack', 'stat_defense',
  'stat_armor', 'stat_damage', 'stat_hp', 'winner', 'cyrb32', 'cyrb53'];

async function makeArenaJoined(listOfWinners) {
  const fshArenaJoined = await get('fsh_arenaJoined');
  if (!fshArenaJoined) { return; }
  const output = fshArenaJoined
    .map((o) => fromEntries(entries(o)
      .concat([['joinDate', formatUtcDateTime(new Date(o.joined * 1000))]])
      .concat([['winner', listOfWinners[o.pvpId]]])
      .concat([['cyrb32', makeHash(cyrb32, o)]])
      .concat([['cyrb53', makeHash(cyrb53, o)]])))
    .map((o) => joinedFields.map((j) => o[j]))
    .reduce(tabDelimited, `${joinedFields.join('\t')}\n`);
  makeDownloadAnchor(output,
    'text/plain', 'fsh_arenaJoined.txt', 'fsh_arenaJoined');
}

function occurences(acc, player) {
  if (!acc[player]) { acc[player] = 0; }
  acc[player] += 1;
  return acc;
}

function countEntries(ary) {
  return entries([].concat(...ary.map((o) => o.players)).reduce(occurences, {}));
}

async function getListOfWinners(thisArenas) {
  const fshArenaWinners = await get('fsh_arenaWinners') || {};
  const winnersToGet = thisArenas.filter((a) => !fshArenaWinners[a.id])
    .map((o) => o.id);
  const prm = winnersToGet.map(getWinner);
  const newWinners = fromEntries(await all(prm));
  const combinedWinners = { ...fshArenaWinners, ...newWinners };
  set('fsh_arenaWinners', combinedWinners);
  return combinedWinners;
}

function countWinners(ary) {
  return ary.map((o) => o.winner).reduce(occurences, {});
}

function processArenas(arenas) {
  const arenaEntries = countEntries(arenas);
  const arenaWinners = countWinners(arenas);
  return arenaEntries
    .map(partial(addWinners, arenaWinners))
    .map(addRatio)
    .sort(byWins);
}

async function processCompleted(thisComplete) {
  // console.log('thisComplete', thisComplete);
  const thisArenas = thisComplete.r.arenas;
  // console.log('thisArenas', thisArenas);

  const listOfWinners = await getListOfWinners(thisArenas);
  // console.log('listOfWinners', listOfWinners);

  const arenaStandard = thisArenas.filter((o) => o.type === 1).map((o) => ({
    id: o.id,
    players: o.players.map((p) => p.name),
    specials: o.specials,
    winner: listOfWinners[o.id],
  }));

  const arenaBasicStats = processArenas(arenaStandard.filter((o) => !o.specials));
  // eslint-disable-next-line no-console
  console.log('arenaBasicStats', arenaBasicStats);

  const arenaSpecialStats = processArenas(arenaStandard.filter((o) => o.specials));
  // eslint-disable-next-line no-console
  console.log('arenaSpecialStats', arenaSpecialStats);

  // makeArenaWins(typeWins);
  await makeArenaJoined(listOfWinners);
}

async function crawler() {
  const thisComplete = await completed();
  if (thisComplete.s) { processCompleted(thisComplete); }
}

export default crawler;
//# sourceMappingURL=crawler-3b554ed9.js.map
