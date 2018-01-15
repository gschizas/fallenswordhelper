import {fallback} from '../../support/system';
import {theInv} from '../inventory';

function gsRecall(row) {
  return '<span class="fshLink recallItem" invid="' +
    row.inv_id + '" playerid="' +
    fallback(row.player_id, theInv.player_id) +
    '" mode="1" action="recall">GS</span>';
}

function gsStore(row) {
  return '<span class="fshLink storeItem" invid="' +
    row.inv_id + '">GS</span>';
}

function gsDisplayType(type, row, fn) {
  if (type === 'display') {
    return fn(row);
  }
  return 'GS';
}

function onGuildMember(row) {
  return row.player_id && row.player_id !== -1;
}

function isTagged(row) {
  return row.folder_id && row.guild_tag !== '-1';
}

function canRecall(row) {
  return onGuildMember(row) || isTagged(row);
}

function canStore(row) {
  return row.folder_id && !row.bound; // && !row.equipped;
}

export default function gsRender(_data, type, row) {
  if (canRecall(row)) {return gsDisplayType(type, row, gsRecall);}
  if (canStore(row)) {return gsDisplayType(type, row, gsStore);}
}
