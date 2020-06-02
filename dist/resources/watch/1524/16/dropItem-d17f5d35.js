import { D as getValue } from './calfSystem-6e4b53e3.js';
import { d as dialog } from './dialog-e7c94c6d.js';
import { i as indexAjaxJson } from './indexAjaxJson-3f2c1d04.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-873ef21a.js';
import { s as senditems } from './senditems-05aac690.js';

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
//# sourceMappingURL=dropItem-d17f5d35.js.map
