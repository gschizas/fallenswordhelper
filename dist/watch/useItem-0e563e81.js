import { bF as indexAjaxJson } from './calfSystem-e592bbc5.js';
import { e as errorDialog } from './errorDialog-06c6b640.js';
import { d as dialog } from './dialog-0a15f579.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-48d0ed4c.js';
import { d as daUseItem } from './daUseItem-a3b0b69a.js';

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
//# sourceMappingURL=useItem-0e563e81.js.map
