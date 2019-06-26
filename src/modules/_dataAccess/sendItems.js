import {ajaxResult} from './ajaxResult';
import getValue from '../system/getValue';
import indexAjaxData from '../ajax/indexAjaxData';

export default function senditems(invIdAry) {
  return indexAjaxData({
    cmd: 'trade',
    subcmd: 'senditems',
    xc: window.ajaxXC,
    target_username: getValue('itemRecipient'),
    sendItemList: invIdAry
  }).then(ajaxResult);
}
