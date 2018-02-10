import playerName from './playerName';
import {theInv} from '../options';

function whereRenderGuildFilter(row) {
  if (row.player_id === -1) {return 'GS';}
  return playerName(row.player_id);
}

export default function whereRenderFilter(data, type, row) {
  if (row.player_id) {
    return whereRenderGuildFilter(row);
  }
  if (row.equipped) {return 'Worn';}
  return theInv.folders[row.folder_id];
}
