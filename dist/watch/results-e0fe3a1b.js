import { ak as get, q as entries, i as insertElement, p as pCC, e as createDiv } from './calfSystem-98d7118c.js';
import './toLowerCase-7c48beec.js';
import { c as createTable } from './createTable-0de4c78c.js';
import { t as thisTournament } from './thisTournament-59077470.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-b2ed2fcb.js';

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
//# sourceMappingURL=results-e0fe3a1b.js.map
