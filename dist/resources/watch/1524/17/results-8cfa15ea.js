import { l as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-f6498976.js';
import './toLowerCase-3e1bda15.js';
import { g as get } from './idb-19d381b0.js';
import { c as createTable } from './createTable-dcefe5ce.js';
import { t as thisTournament } from './thisTournament-42470924.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-cb795e43.js';

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
//# sourceMappingURL=results-8cfa15ea.js.map
