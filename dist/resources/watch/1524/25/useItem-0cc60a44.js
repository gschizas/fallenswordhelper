import { e as errorDialog } from './errorDialog-c0c5c278.js';
import { i as indexAjaxJson } from './indexAjaxJson-d9144b37.js';
import { d as daUseItem } from './daUseItem-42892a72.js';
import { d as dialog } from './dialog-294b8a9c.js';

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
//# sourceMappingURL=useItem-0cc60a44.js.map
