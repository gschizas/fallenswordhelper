import { e as errorDialog } from './errorDialog-8d3200e2.js';
import { i as indexAjaxJson } from './indexAjaxJson-42210c04.js';
import { d as daUseItem } from './daUseItem-b733e1e9.js';
import { d as dialog } from './dialog-ca00f6b8.js';

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
//# sourceMappingURL=useItem-76b3c52f.js.map
