import { a7 as get, l as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-b469667c.js';
import './toLowerCase-7cb70168.js';
import { c as createTable } from './createTable-1921c6ec.js';
import { t as thisTournament } from './thisTournament-813566b2.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-4022c10c.js';

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
//# sourceMappingURL=results-81df311b.js.map
