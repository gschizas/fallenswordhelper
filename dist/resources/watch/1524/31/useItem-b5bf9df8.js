import { d as dialog } from './dialog-d161529e.js';
import { i as indexAjaxJson } from './indexAjaxJson-0938fd4f.js';
import { d as daUseItem } from './daUseItem-d0f373da.js';
import { e as errorDialog } from './errorDialog-9d880b0d.js';

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
//# sourceMappingURL=useItem-b5bf9df8.js.map
