import ajaxReturnCode from '../app/ajaxReturnCode';
import recall from '../app/guild/inventory/recall';

export default function recallItem(invId, playerId, mode) {
  return recall(invId, playerId, mode).pipe(ajaxReturnCode);
}
