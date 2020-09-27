import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b$ as defStatbarLevel } from './calfSystem-0ffc234f.js';
import './intValue-65d3c36c.js';
import { v as valueText } from './valueText-173142a3.js';
import './padZ-0c2f5370.js';
import { t as timeBox, a as asInt } from './timeBox-49cfc9d4.js';

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
//# sourceMappingURL=injectLevelupCalculator-a2495399.js.map
