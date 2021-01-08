import { e as errorDialog } from './errorDialog-f6569d61.js';
import { i as indexAjaxJson } from './indexAjaxJson-e70729f5.js';
import { d as daUseItem } from './daUseItem-780ebf85.js';
import { d as dialog } from './dialog-81b3293d.js';

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
//# sourceMappingURL=useItem-e19d5878.js.map
