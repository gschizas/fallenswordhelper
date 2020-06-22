import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-995e3482.js';
import './toLowerCase-02326a77.js';
import { g as get } from './idb-ece4ba5b.js';
import { c as createTable } from './createTable-1a468286.js';
import { t as thisTournament } from './thisTournament-c5778ed7.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-14e1f2cd.js';

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
//# sourceMappingURL=results-7e4b1435.js.map
