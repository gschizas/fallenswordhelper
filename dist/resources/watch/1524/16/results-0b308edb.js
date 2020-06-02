import { l as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-6e4b53e3.js';
import './toLowerCase-16825a0a.js';
import { g as get } from './idb-fc617077.js';
import { c as createTable } from './createTable-d48b0997.js';
import { t as thisTournament } from './thisTournament-89d73312.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-cf0e4adb.js';

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
//# sourceMappingURL=results-0b308edb.js.map
