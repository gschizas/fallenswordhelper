import { e as errorDialog } from './errorDialog-ffb78573.js';
import { i as indexAjaxJson } from './indexAjaxJson-f24b8c24.js';
import { d as daUseItem } from './daUseItem-dbacd00d.js';
import { d as dialog } from './dialog-30fd8a85.js';

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
//# sourceMappingURL=useItem-64fbcfe2.js.map
