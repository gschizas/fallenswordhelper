import {dialog, htmlResult} from '../support/ajax';
import * as system from '../support/system';

export default function sendItem(invIdList) {
  return $.ajax({
    url: 'index.php',
    data: {
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: system.getValue('itemRecipient'),
      sendItemList: invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
}
