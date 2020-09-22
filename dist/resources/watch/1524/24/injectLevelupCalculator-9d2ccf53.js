import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b$ as defStatbarLevel } from './calfSystem-dea093d3.js';
import './intValue-44683b42.js';
import { v as valueText } from './valueText-63491c45.js';
import './padZ-cba8efb8.js';
import { t as timeBox, a as asInt } from './timeBox-3de3f1ac.js';

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
//# sourceMappingURL=injectLevelupCalculator-9d2ccf53.js.map
