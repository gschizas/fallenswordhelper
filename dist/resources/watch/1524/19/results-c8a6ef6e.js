import { l as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-03895320.js';
import './toLowerCase-bbc44a43.js';
import { g as get } from './idb-1121a73b.js';
import { c as createTable } from './createTable-e5c32299.js';
import { t as thisTournament } from './thisTournament-292144c6.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-677b9fe8.js';

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
//# sourceMappingURL=results-c8a6ef6e.js.map
