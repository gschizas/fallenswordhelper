import fallback from '../../system/fallback';

export default function whereData(row) {
  return fallback(row.folder_id, row.player_id);
}
