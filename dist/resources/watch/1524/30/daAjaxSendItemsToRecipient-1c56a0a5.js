import { G as getValue } from './calfSystem-d357ca6f.js';
import { s as senditems } from './senditems-b44aecf1.js';

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
//# sourceMappingURL=daAjaxSendItemsToRecipient-1c56a0a5.js.map
