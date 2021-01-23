import { ap as itemType, e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-91adbec8.js';
import { c as createTable } from './createTable-f28d3fb9.js';
import { g as get } from './idb-321c4955.js';
import { t as thisTournament } from './thisTournament-f0e1ea57.js';
import { t as toLowerCase } from './toLowerCase-51740687.js';

/* eslint-disable no-bitwise */

/* https://stackoverflow.com/a/52171480/1274806 */

function cyrb32(s) {
  let h = 6;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(h ^ s.charCodeAt(i), 9 ** 9);
  }
  return (h ^ h >>> 9) >>> 0;
}

function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507)
    ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507)
    ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function makeHash(hashFn, equip) {
  return hashFn(
    itemType
      .map(toLowerCase)
      .map((t) => equip[t])
      .filter((s) => s)
      .join(),
  );
}

function makeRows(equip) {
  return entries(equip)
    .concat([['cyrb32', makeHash(cyrb32, equip)]])
    .concat([['cyrb53', makeHash(cyrb53, equip)]])
    .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
    .join('');
}

function displayObj(equip) {
  const aTbl = createTable({ innerHTML: `<tbody>${makeRows(equip)}</tbody>` });
  insertElement(pCC, createDiv({ innerHTML: '&nbsp;' }));
  insertElement(pCC, aTbl);
}

async function results() {
  const fshArenaJoined = await get('fsh_arenaJoined');
  if (!fshArenaJoined) { return; }
  const thisArena = thisTournament();
  const equip = fshArenaJoined.find((o) => o.pvpId === thisArena);
  if (equip) { displayObj(equip); }
}

export default results;
//# sourceMappingURL=results-ead7b46a.js.map
