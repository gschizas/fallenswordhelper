import {fallback} from '../../support/system';

export default function whereData(row) {
  return fallback(row.folder_id, row.player_id);
}
