import { bF as indexAjaxJson } from './calfSystem-69cf053a.js';
import { d as dialogMsg } from './dialogMsg-a23742d3.js';
import { d as dialog } from './dialog-3331db38.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-b66bc090.js';
import { d as daUseItem } from './daUseItem-c4f83f57.js';

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
//# sourceMappingURL=useItem-4514f142.js.map
