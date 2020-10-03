import { G as getValue } from './calfSystem-c851a12c.js';
import { s as senditems } from './senditems-e2cc25e2.js';

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
//# sourceMappingURL=daAjaxSendItemsToRecipient-feca3077.js.map
