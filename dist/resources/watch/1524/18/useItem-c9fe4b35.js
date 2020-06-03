import { e as errorDialog } from './errorDialog-1630e28b.js';
import { d as dialog } from './dialog-d31b92fc.js';
import { i as indexAjaxJson } from './indexAjaxJson-c1eaa5d5.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-4766dec9.js';
import { d as daUseItem } from './daUseItem-0f08389d.js';

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
//# sourceMappingURL=useItem-c9fe4b35.js.map
