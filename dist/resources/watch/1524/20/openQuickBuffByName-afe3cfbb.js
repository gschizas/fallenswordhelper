import { L as quickbuffUrl } from './calfSystem-c0288c6c.js';
import { f as fshOpen } from './fshOpen-1a8bb979.js';

function openQuickBuffByName(aPlayerName, buffList) {
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  fshOpen(`${quickbuffUrl}&t=${aPlayerName}${passthru}`,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export { openQuickBuffByName as o };
//# sourceMappingURL=openQuickBuffByName-afe3cfbb.js.map
