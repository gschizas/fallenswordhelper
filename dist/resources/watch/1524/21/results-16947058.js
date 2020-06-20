import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-b0234231.js';
import './toLowerCase-2a33d54b.js';
import { g as get } from './idb-0eb46835.js';
import { c as createTable } from './createTable-4c7c3dd5.js';
import { t as thisTournament } from './thisTournament-b8af4059.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-596a9d66.js';

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
//# sourceMappingURL=results-16947058.js.map
