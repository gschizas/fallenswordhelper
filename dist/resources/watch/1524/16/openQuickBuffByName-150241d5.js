import { K as quickbuffUrl } from './calfSystem-6e4b53e3.js';
import { f as fshOpen } from './fshOpen-141e42b5.js';

function openQuickBuffByName(aPlayerName, buffList) {
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  fshOpen(`${quickbuffUrl}&t=${aPlayerName}${passthru}`,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export { openQuickBuffByName as o };
//# sourceMappingURL=openQuickBuffByName-150241d5.js.map
