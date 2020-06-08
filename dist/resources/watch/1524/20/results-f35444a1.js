import { m as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-c0288c6c.js';
import './toLowerCase-e5817205.js';
import { g as get } from './idb-247b069e.js';
import { c as createTable } from './createTable-f5cad5e0.js';
import { t as thisTournament } from './thisTournament-9e4af3ac.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-b0e5a556.js';

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
//# sourceMappingURL=results-f35444a1.js.map
