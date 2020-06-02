import { D as getValue } from './calfSystem-f6498976.js';
import { d as dialog } from './dialog-c5304eba.js';
import { i as indexAjaxJson } from './indexAjaxJson-d6e4bb8c.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-7f635355.js';
import { s as senditems } from './senditems-1d7ffb08.js';

function sendItemsToRecipient(invIdAry) {
  return senditems(getValue('itemRecipient'), invIdAry);
}

// import { $dataAccess } from './_dataAccess';
// import sendItemsToRecipient from './fallbacks/sendItemsToRecipient';

function daAjaxSendItemsToRecipient(invIdAry) {
  // return $dataAccess(appSendItemsToRecipient, sendItemsToRecipient, invIdAry);
  return sendItemsToRecipient(invIdAry);
}

function ajaxSendItems(invIdAry) {
  return daAjaxSendItemsToRecipient(invIdAry).then(ajaxReturnCode);
}

function dropItem(invIdList) {
  return indexAjaxJson({
    cmd: 'profile',
    subcmd: 'dodropitems',
    removeIndex: invIdList,
    ajax: 1,
  }).then(dialog);
}

export { ajaxSendItems as a, dropItem as d };
//# sourceMappingURL=dropItem-c11b4478.js.map
