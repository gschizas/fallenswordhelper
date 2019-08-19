import {entries} from '../common/entries';
import {get} from 'idb-keyval';
import insertElement from '../common/insertElement';
import {pCC} from '../support/layout';
import {thisTournament} from './arenaJoin/thisTournament';
import {createDiv, createTable} from '../common/cElement';
import {cyrb32, cyrb53, makeHash} from '../notepad/arenaCrawler/makeHash';

function makeRows(equip) {
  return entries(equip)
    .concat([['cyrb32', makeHash(cyrb32, equip)]])
    .concat([['cyrb53', makeHash(cyrb53, equip)]])
    .map(([key, value]) =>
      `<tr><td>${key}</td><td>${value}</td></tr>`).join('');
}

function displayObj(equip) {
  const aTbl = createTable({innerHTML: `<tbody>${makeRows(equip)}</tbody>`});
  insertElement(pCC, createDiv({innerHTML: '&nbsp;'}));
  insertElement(pCC, aTbl);
}

export default async function results() {
  const fsh_arenaJoined = await get('fsh_arenaJoined');
  if (!fsh_arenaJoined) {return;}
  const thisArena = thisTournament();
  const equip = fsh_arenaJoined.find(o => o.pvpId === thisArena);
  if (equip) {displayObj(equip);}
}
