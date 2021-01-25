import { d as dialog } from './dialog-2c5b535b.js';
import { i as indexAjaxJson } from './indexAjaxJson-354daa84.js';
import { d as daUseItem } from './daUseItem-ac71fbab.js';
import { e as errorDialog } from './errorDialog-56c5d78c.js';

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
//# sourceMappingURL=useItem-2e67129b.js.map
