import isSelected from '../../system/isSelected';
import playerName from './playerName';
import {theInv} from '../options';

function whereRenderGuildDisplay(row) {
  if (row.player_id === -1) {return 'GS';}
  return '<a class="fshMaroon" href="index.php?cmd=profile&player_id=' +
    row.player_id + '">' + playerName(row.player_id) + '</a>';
}

export default function whereRenderDisplay(data, type, row) {
  if (row.player_id) {
    return whereRenderGuildDisplay(row);
  }
  if (row.equipped) {return 'Worn';}
  var folderSelect = '<select class="fshMoveItem" data-inv="' + row.inv_id +
    '">';
  var keysArray = Object.keys(theInv.folders)
    .sort(function(a, b) {return a - b;});
  keysArray.forEach(function(value) {
    folderSelect += '<option value="' + value + '"' +
      isSelected(Number(value), row.folder_id) + '>' +
      theInv.folders[value] + '</option>';
  });
  folderSelect += '</select>';
  return folderSelect;
}
