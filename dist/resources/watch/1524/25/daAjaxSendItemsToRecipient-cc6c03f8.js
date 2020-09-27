import { G as getValue } from './calfSystem-0ffc234f.js';
import { s as senditems } from './senditems-3797eec0.js';

function sendItemsToRecipient(invIdAry) {
  return senditems(getValue('itemRecipient'), invIdAry);
}

// import { $dataAccess } from './_dataAccess';
// import sendItemsToRecipient from './fallbacks/sendItemsToRecipient';

function daAjaxSendItemsToRecipient(invIdAry) {
  // return $dataAccess(appSendItemsToRecipient, sendItemsToRecipient, invIdAry);
  return sendItemsToRecipient(invIdAry);
}

export { daAjaxSendItemsToRecipient as d };
//# sourceMappingURL=daAjaxSendItemsToRecipient-cc6c03f8.js.map
