import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b$ as defStatbarLevel } from './calfSystem-995e3482.js';
import './intValue-0c980717.js';
import { v as valueText } from './valueText-f7e6bf42.js';
import './padZ-a2b67169.js';
import { t as timeBox, a as asInt } from './timeBox-fb833883.js';

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
//# sourceMappingURL=injectLevelupCalculator-d2eef544.js.map
