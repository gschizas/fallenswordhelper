// import { $dataAccess } from './_dataAccess';
import appSendItemsToRecipient from '../app/trade/sendItemsToRecipient';
// import sendItemsToRecipient from './fallbacks/sendItemsToRecipient';

export default function daAjaxSendItemsToRecipient(invIdAry) {
  // return $dataAccess(appSendItemsToRecipient, sendItemsToRecipient, invIdAry);
  return appSendItemsToRecipient(invIdAry);
}
