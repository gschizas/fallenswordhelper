import { e as errorDialog } from './errorDialog-7f9c11b0.js';
import { i as indexAjaxJson } from './indexAjaxJson-26919f52.js';
import { d as daUseItem } from './daUseItem-d416b7cf.js';
import { d as dialog } from './dialog-370f639a.js';

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
//# sourceMappingURL=useItem-cf2afd79.js.map
