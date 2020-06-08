import { a as ajaxReturnCode } from './ajaxReturnCode-8b0a112c.js';
import { d as dialog } from './dialog-bd1f5d24.js';
import { i as indexAjaxJson } from './indexAjaxJson-ebc8dc2e.js';
import { e as errorDialog } from './errorDialog-ff08b5f8.js';
import { d as daUseItem } from './daUseItem-5e226370.js';

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
//# sourceMappingURL=useItem-9908d3b5.js.map
