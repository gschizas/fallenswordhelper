import { bF as indexAjaxJson } from './calfSystem-98d7118c.js';
import { e as errorDialog } from './errorDialog-63025bee.js';
import { d as dialog } from './dialog-e28ca3fe.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-8e7c5aaf.js';
import { d as daUseItem } from './daUseItem-29807059.js';

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
//# sourceMappingURL=useItem-5b97ec4b.js.map
