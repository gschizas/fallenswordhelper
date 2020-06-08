import { G as getValue } from './calfSystem-c0288c6c.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-8b0a112c.js';
import { s as senditems } from './senditems-c1478d9d.js';
import { d as dialog } from './dialog-bd1f5d24.js';
import { i as indexAjaxJson } from './indexAjaxJson-ebc8dc2e.js';

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
//# sourceMappingURL=dropItem-8d095b74.js.map
