import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-975d976a.js';
import './toLowerCase-33399b5a.js';
import { g as get } from './idb-9c55d032.js';
import { c as createTable } from './createTable-40ee0864.js';
import { t as thisTournament } from './thisTournament-9880ed03.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-aeaa3635.js';

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
//# sourceMappingURL=results-e2a1e828.js.map
