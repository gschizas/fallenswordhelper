import ajaxReturnCode from '../common/ajaxReturnCode';
import daAjaxSendItemsToRecipient from '../_dataAccess/daAjaxSendItemsToRecipient';

export default function ajaxSendItems(invIdAry) {
  return daAjaxSendItemsToRecipient(invIdAry).then(ajaxReturnCode);
}
