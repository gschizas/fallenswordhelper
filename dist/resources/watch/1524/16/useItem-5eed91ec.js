import { e as errorDialog } from './errorDialog-9b126515.js';
import { d as dialog } from './dialog-e7c94c6d.js';
import { i as indexAjaxJson } from './indexAjaxJson-3f2c1d04.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-873ef21a.js';
import { d as daUseItem } from './daUseItem-5d9f615b.js';

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
//# sourceMappingURL=useItem-5eed91ec.js.map
