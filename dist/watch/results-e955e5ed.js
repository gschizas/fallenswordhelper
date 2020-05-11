import { ai as get, q as entries, i as insertElement, p as pCC, e as createDiv } from './calfSystem-05ea3a63.js';
import './toLowerCase-6122d0ce.js';
import { c as createTable } from './createTable-633b7875.js';
import { t as thisTournament } from './thisTournament-6bbad5fa.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-e1faf76c.js';

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
//# sourceMappingURL=results-e955e5ed.js.map
