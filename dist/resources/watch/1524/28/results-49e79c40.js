import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-21d16a0e.js';
import './toLowerCase-27ea448e.js';
import { g as get } from './idb-42714ac8.js';
import { c as createTable } from './createTable-8c50a485.js';
import { t as thisTournament } from './thisTournament-8f68914f.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-a5c802f3.js';

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
//# sourceMappingURL=results-49e79c40.js.map
