import { bF as indexAjaxJson } from './calfSystem-05ea3a63.js';
import { d as dialogMsg } from './dialogMsg-aee6b96b.js';
import { d as dialog } from './dialog-d81e4520.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-2bbecc09.js';
import { d as daUseItem } from './daUseItem-a4e878d1.js';

function hasErrorMsg(json) {
  return json.e && json.e.message;
}

function errorDialog(json) {
  if (!json.s && hasErrorMsg(json)) {
    dialogMsg(json.e.message);
  }
  return json;
}

function equipItem(backpackInvId) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'equipitem',
    inventory_id: backpackInvId,
    ajax: 1,
  }).then(dialog);
}

function useItem(backpackInvId) {
  return daUseItem(backpackInvId).then(errorDialog).then(ajaxReturnCode);
}

export { equipItem as a, errorDialog as e, useItem as u };
//# sourceMappingURL=useItem-cc76d97d.js.map
