import ajaxReturnCode from '../common/ajaxReturnCode';
import daGuildRecall from '../_dataAccess/daGuildRecall';

export default function recallItem(invId, playerId, mode) {
  return daGuildRecall(invId, playerId, mode).then(ajaxReturnCode);
}
