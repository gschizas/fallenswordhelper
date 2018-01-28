import dialog from './dialog';
import {getValue} from '../support/system';
import {infoBox} from '../support/layout';
import retryAjax from './retryAjax';

function htmlResult(data) { // TODO change to app code to avoid 302 redirect
  var info = infoBox(data);
  var _r = 1;
  // if (info.search(/(successfully|gained|components)/) !== -1) {_r = 0;}
  if (info.includes('successfully')) {_r = 0;}
  return {r: _r, m: info};
}

export default function sendItem(invIdList) {
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'trade',
      subcmd: 'senditems',
      xc: window.ajaxXC,
      target_username: getValue('itemRecipient'),
      sendItemList: invIdList
    }
  }).pipe(htmlResult)
    .done(dialog);
}
