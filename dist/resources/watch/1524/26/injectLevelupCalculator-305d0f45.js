import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b$ as defStatbarLevel } from './calfSystem-c851a12c.js';
import './intValue-e4cdd281.js';
import { v as valueText } from './valueText-92ef1aee.js';
import './padZ-f9e33f92.js';
import { t as timeBox, a as asInt } from './timeBox-2e1de5e0.js';

function injectLevelupCalculator() {
  const nextGain = getElementsByClassName('stat-xp-nextGain');
  if (nextGain.length === 0) { return; }
  insertHtmlBeforeEnd(getElementById(defStatbarLevel),
    `<dt class="stat-xp-nextLevel">Next Level At</dt>${
      timeBox(
        valueText(nextGain),
        Math.ceil(asInt('stat-xp-remaining') / asInt('stat-xp-gainPerHour')),
      )}`);
}

export default injectLevelupCalculator;
//# sourceMappingURL=injectLevelupCalculator-305d0f45.js.map
