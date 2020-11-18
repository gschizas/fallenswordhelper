import { e as entries, i as insertElement, p as pCC, b as createDiv } from './calfSystem-b31646eb.js';
import './toLowerCase-0a22477f.js';
import { g as get } from './idb-5f2321bd.js';
import { c as createTable } from './createTable-095baafd.js';
import { t as thisTournament } from './thisTournament-d879adae.js';
import { m as makeHash, c as cyrb32, a as cyrb53 } from './makeHash-f6437a20.js';

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
//# sourceMappingURL=results-0073a009.js.map
