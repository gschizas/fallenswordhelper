import playerName from './playerName';

function whereRenderUserFolder(row) {
  if (row.equipped) {return -2;}
  return parseInt(row.folder_id, 10);
}

export default function whereRender(data, type, row) {
  if (row.folder_id) {
    return whereRenderUserFolder(row);
  }
  if (row.player_id === -1) {return '~';}
  return playerName(row.player_id);
}
