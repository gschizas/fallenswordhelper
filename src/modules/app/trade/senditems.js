import ajaxReturnCode from '../ajaxReturnCode';
import callApp from '../callApp';
import getValue from '../../system/getValue';

export default function senditems(invIdAry) {
  return callApp({
    cmd: 'trade',
    subcmd: 'senditems',
    xc: window.ajaxXC,
    target_username: getValue('itemRecipient'),
    items: invIdAry
  }).then(ajaxReturnCode);
}
