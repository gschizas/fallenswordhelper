import { F as getElementsByClassName, e as insertHtmlBeforeEnd, x as getElementById, c2 as defStatbarLevel } from './calfSystem-6e4b53e3.js';
import './intValue-8ba42bf3.js';
import { v as valueText } from './valueText-424c7b17.js';
import './padZ-e4d6f7a0.js';
import { t as timeBox, a as asInt } from './timeBox-b1ccaff6.js';

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
//# sourceMappingURL=injectLevelupCalculator-183fd810.js.map
