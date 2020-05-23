import { bF as indexAjaxJson } from './calfSystem-5ce1fc75.js';
import { e as errorDialog } from './errorDialog-072758db.js';
import { d as dialog } from './dialog-d7c6a95b.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-dc7460e3.js';
import { d as daUseItem } from './daUseItem-6e748997.js';

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
//# sourceMappingURL=useItem-db433fac.js.map
