import { bF as indexAjaxJson } from './calfSystem-43606e5e.js';
import { e as errorDialog } from './errorDialog-27781bc1.js';
import { d as dialog } from './dialog-6ee4241f.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-2b6d49c6.js';
import { d as daUseItem } from './daUseItem-0cb5d25a.js';

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
//# sourceMappingURL=useItem-8f8006e3.js.map
