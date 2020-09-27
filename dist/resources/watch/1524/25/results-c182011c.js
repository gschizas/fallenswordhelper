import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-0ffc234f.js';
import './toLowerCase-c42114e1.js';
import { g as get } from './idb-b52eaa3c.js';
import { c as createTable } from './createTable-d74db384.js';
import { t as thisTournament } from './thisTournament-acdc4b9a.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-45b6bd7b.js';

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
//# sourceMappingURL=results-c182011c.js.map
