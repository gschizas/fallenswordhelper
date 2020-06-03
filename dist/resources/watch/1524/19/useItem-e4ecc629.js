import { e as errorDialog } from './errorDialog-ac4542f2.js';
import { d as dialog } from './dialog-b2576a6e.js';
import { i as indexAjaxJson } from './indexAjaxJson-22cdf082.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-027e70a0.js';
import { d as daUseItem } from './daUseItem-89d9f137.js';

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
//# sourceMappingURL=useItem-e4ecc629.js.map
