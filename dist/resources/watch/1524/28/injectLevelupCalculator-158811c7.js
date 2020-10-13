import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b_ as defStatbarLevel } from './calfSystem-21d16a0e.js';
import './intValue-f4d85578.js';
import { v as valueText } from './valueText-6bc7cb16.js';
import './padZ-28ca6b6e.js';
import { t as timeBox, a as asInt } from './timeBox-5f5d94ce.js';

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
//# sourceMappingURL=injectLevelupCalculator-158811c7.js.map
