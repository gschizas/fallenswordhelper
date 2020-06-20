import { e as errorDialog } from './errorDialog-cd85748a.js';
import { i as indexAjaxJson } from './indexAjaxJson-94973d1e.js';
import { d as daUseItem } from './daUseItem-5496e1f2.js';
import { d as dialog } from './dialog-5e5323f2.js';

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
//# sourceMappingURL=useItem-26f19661.js.map
