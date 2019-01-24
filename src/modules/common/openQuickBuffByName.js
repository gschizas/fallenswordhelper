import {quickbuffUrl} from '../support/constants';

export default function openQuickBuffByName(aPlayerName) {
  window.openWindow(quickbuffUrl + '&t=' + aPlayerName,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}
