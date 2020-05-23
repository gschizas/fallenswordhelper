import { G as getValue, bF as indexAjaxJson } from './calfSystem-98d7118c.js';
import { d as dialog } from './dialog-e28ca3fe.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-8e7c5aaf.js';
import { s as senditems } from './senditems-0f336573.js';

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
//# sourceMappingURL=dropItem-fe99654b.js.map
