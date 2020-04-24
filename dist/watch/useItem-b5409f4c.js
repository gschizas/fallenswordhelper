import { bF as indexAjaxJson } from './calfSystem-1499e8da.js';
import { d as dialogMsg } from './dialogMsg-eb4f8460.js';
import { d as dialog } from './dialog-40516655.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-5beb5291.js';
import { d as daUseItem } from './daUseItem-279d89a4.js';

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
//# sourceMappingURL=useItem-b5409f4c.js.map
