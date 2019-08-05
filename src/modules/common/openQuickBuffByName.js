import fshOpen from '../chrome/fshOpen';
import {quickbuffUrl} from '../support/constants';

export default function openQuickBuffByName(aPlayerName) {
  fshOpen(quickbuffUrl + '&t=' + aPlayerName,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}
