import ajaxReturnCode from '../common/ajaxReturnCode';
import { daAjaxSendItemsToRecipient } from '../_dataAccess/_dataAccess';

export default function ajaxSendItems(invIdAry) {
  return daAjaxSendItemsToRecipient(invIdAry).then(ajaxReturnCode);
}
