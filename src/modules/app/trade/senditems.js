import callApp from '../callApp';
import {getValue} from '../../support/system';

export default function senditems(invIdAry) {
  return callApp({
    cmd: 'trade',
    subcmd: 'senditems',
    xc: window.ajaxXC,
    target_username: getValue('itemRecipient'),
    sendItemList: invIdAry // This isn't working...
  });
}
