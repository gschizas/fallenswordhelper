import { J as quickbuffUrl } from './calfSystem-b469667c.js';
import { f as fshOpen } from './fshOpen-9caa1c78.js';

function openQuickBuffByName(aPlayerName) {
  fshOpen(`${quickbuffUrl}&t=${aPlayerName}`,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export { openQuickBuffByName as o };
//# sourceMappingURL=openQuickBuffByName-938fcbbf.js.map
