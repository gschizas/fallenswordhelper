import {getValue} from '../support/system';
import retryAjax from './retryAjax';
import {dialog, htmlResult} from '../support/ajax';

export default function sendItem(invIdList) {
  return retryAjax({
    url: 'index.php',
    data: {
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: getValue('itemRecipient'),
      sendItemList: invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
}
