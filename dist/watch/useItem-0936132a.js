import { bF as indexAjaxJson } from './calfSystem-cb5d894f.js';
import { e as errorDialog } from './errorDialog-3596e400.js';
import { d as dialog } from './dialog-7dbf763d.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-9c192fc3.js';
import { d as daUseItem } from './daUseItem-331b93bf.js';

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
//# sourceMappingURL=useItem-0936132a.js.map
