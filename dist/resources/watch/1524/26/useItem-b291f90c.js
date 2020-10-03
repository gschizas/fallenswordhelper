import { e as errorDialog } from './errorDialog-4ea6fda9.js';
import { i as indexAjaxJson } from './indexAjaxJson-bfe47429.js';
import { d as daUseItem } from './daUseItem-cc1ee451.js';
import { d as dialog } from './dialog-e2d24ff9.js';

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
//# sourceMappingURL=useItem-b291f90c.js.map
