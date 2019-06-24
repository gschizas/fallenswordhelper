import {htmlResult} from './htmlResult';
import indexAjaxData from '../ajax/indexAjaxData';

export default function guildInvRecall(invId, playerId, mode) {
  return indexAjaxData({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'recall',
    id: invId,
    player_id: playerId,
    mode: mode
  }).then(htmlResult);
}
