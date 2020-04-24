import { G as getValue, bF as indexAjaxJson } from './calfSystem-69cf053a.js';
import { d as dialog } from './dialog-3331db38.js';
import { a as ajaxReturnCode } from './ajaxReturnCode-b66bc090.js';
import { s as senditems } from './senditems-76f6ce22.js';

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
//# sourceMappingURL=dropItem-68b740e7.js.map
