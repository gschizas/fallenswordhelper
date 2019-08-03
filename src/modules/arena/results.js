import {entries} from '../common/entries';
import {get} from 'idb-keyval';
import insertElement from '../common/insertElement';
import {pCC} from '../support/layout';
import {thisTournament} from './arenaJoin/thisTournament';
import {createDiv, createTable} from '../common/cElement';

function makeRows(equip) {
  return entries(equip).map(([key, value]) =>
    `<tr><td>${key}</td><td>${value}</td></tr>`).join('');
}

function displayObj(equip) {
  // console.log(equip);
  const aTbl = createTable({innerHTML: `<tbody>${makeRows(equip)}</tbody>`});
  insertElement(pCC, createDiv({innerHTML: '&nbsp;'}));
  insertElement(pCC, aTbl);
}

export default async function results() {
  const fsh_arenaJoined = await get('fsh_arenaJoined');
  if (!fsh_arenaJoined) {return;}
  // console.log(fsh_arenaJoined);
  const thisArena = thisTournament();
  const equip = fsh_arenaJoined.find(o => o.pvpId === thisArena);
  if (equip) {displayObj(equip);}
}
