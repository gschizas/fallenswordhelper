import { e as errorDialog } from './errorDialog-397bf548.js';
import { d as dialog } from './dialog-c2adaeab.js';
import { i as indexAjaxJson } from './indexAjaxJson-c6108fea.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-085fabfc.js';
import { d as daUseItem } from './daUseItem-98246ca2.js';

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
//# sourceMappingURL=useItem-f3a1d9a3.js.map
