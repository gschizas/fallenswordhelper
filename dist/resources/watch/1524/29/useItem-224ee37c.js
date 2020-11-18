import { e as errorDialog } from './errorDialog-48ca89f9.js';
import { i as indexAjaxJson } from './indexAjaxJson-2db8a995.js';
import { d as daUseItem } from './daUseItem-a8549441.js';
import { d as dialog } from './dialog-1967d894.js';

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
//# sourceMappingURL=useItem-224ee37c.js.map
