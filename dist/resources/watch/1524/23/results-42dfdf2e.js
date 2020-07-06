import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-2b1fed3f.js';
import './toLowerCase-dda30e6b.js';
import { g as get } from './idb-549f3966.js';
import { c as createTable } from './createTable-681f7f4f.js';
import { t as thisTournament } from './thisTournament-d13e817e.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-57fdb56e.js';

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
//# sourceMappingURL=results-42dfdf2e.js.map
