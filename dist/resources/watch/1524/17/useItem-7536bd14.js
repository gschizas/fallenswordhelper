import { e as errorDialog } from './errorDialog-39a29964.js';
import { d as dialog } from './dialog-c5304eba.js';
import { i as indexAjaxJson } from './indexAjaxJson-d6e4bb8c.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-7f635355.js';
import { d as daUseItem } from './daUseItem-1bdbec91.js';

function equipItem(backpackInvId) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'equipitem',
    inventory_id: backpackInvId,
    ajax: 1,
  }).then(dialog);
}

function useItem(backpackInvId) {
  return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}

export { equipItem as e, useItem as u };
//# sourceMappingURL=useItem-7536bd14.js.map
