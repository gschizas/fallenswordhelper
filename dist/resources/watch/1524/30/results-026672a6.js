import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-d357ca6f.js';
import './toLowerCase-5e186769.js';
import { g as get } from './idb-255a2314.js';
import { c as createTable } from './createTable-337c0681.js';
import { t as thisTournament } from './thisTournament-d2b99eed.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-72831565.js';

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
//# sourceMappingURL=results-026672a6.js.map
