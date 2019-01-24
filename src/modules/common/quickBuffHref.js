import {quickbuffUrl} from '../support/constants';

export default function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  var passthru = '';
  if (buffList) {passthru = '&blist=' + buffList;}
  return 'href=\'javascript:window.openWindow("' + quickbuffUrl + '&tid=' +
    aPlayerId + passthru + '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}
