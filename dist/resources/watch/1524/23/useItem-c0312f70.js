import { e as errorDialog } from './errorDialog-7f431a39.js';
import { i as indexAjaxJson } from './indexAjaxJson-bdb16b7c.js';
import { d as daUseItem } from './daUseItem-8fd000c2.js';
import { d as dialog } from './dialog-2e17f157.js';

function equipItem(backpackInvId) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'equipitem',
    inventory_id: backpackInvId,
    ajax: 1,
  }).then(dialog);
}

const ajaxReturnCode = (json) => ({
  ...json,
  r: json.s ? 0 : 1,
});

function useItem(backpackInvId) {
  return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}

export { ajaxReturnCode as a, equipItem as e, useItem as u };
//# sourceMappingURL=useItem-c0312f70.js.map
