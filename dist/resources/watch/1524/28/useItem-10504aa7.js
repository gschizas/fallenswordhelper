import { e as errorDialog } from './errorDialog-326900ed.js';
import { i as indexAjaxJson } from './indexAjaxJson-299742b0.js';
import { d as daUseItem } from './daUseItem-7e03929b.js';
import { d as dialog } from './dialog-a12ad7bf.js';

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
//# sourceMappingURL=useItem-10504aa7.js.map
