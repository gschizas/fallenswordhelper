import fallback from '../../system/fallback';
import {rarity} from '../../support/dataObj';
import {theInv} from '../inventory';

function getT(player_id) {
  if (player_id === -1) {return 4;}
  return 1;
}

function player(invPlayer, rowPlayer, guild) {
  if (invPlayer) {return invPlayer;}
  if (rowPlayer !== -1) {return rowPlayer;}
  return guild;
}

function isPartOfSet(row) {
  return row.stats && row.stats.set_name !== '';
}

function nameRenderDisplay(data, row) {
  var cur = fallback(theInv.player_id,
    theInv.current_player_id);
  var t = getT(row.player_id);
  var p = player(theInv.player_id, row.player_id,
    theInv.guild_id);

  var bold = data;
  if (row.equipped) {bold = '<b>' + data + '</b>';}

  var _setName = '';
  if (isPartOfSet(row)) {
    _setName = ' (<span class="fshLink setName" set="' + row.stats.set_name +
      '">set</span>)';
  }

  return '<a href="index.php?cmd=auctionhouse&search_text=' + data +
    '" class="fshInvItem tip-dynamic ' +
    rarity[row.rarity].clas + '" ' +
    'data-tipped="fetchitem.php?item_id=' + row.item_id +
    '&inv_id=' + row.inv_id + '&t=' + t + '&p=' + p +
    '&currentPlayerId=' + cur + '">' +
    bold + '</a>' + _setName;
}

export default function nameRender(data, type, row) {
  if (type !== 'display') {return data;}
  return nameRenderDisplay(data, row);
}
