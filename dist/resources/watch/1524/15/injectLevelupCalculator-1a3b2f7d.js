import { F as getElementsByClassName, e as insertHtmlBeforeEnd, x as getElementById, c3 as defStatbarLevel } from './calfSystem-b469667c.js';
import './intValue-8eb7c4cb.js';
import { v as valueText } from './valueText-a1c5a956.js';
import './padZ-d111932e.js';
import { t as timeBox, a as asInt } from './timeBox-0590f020.js';

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
//# sourceMappingURL=injectLevelupCalculator-1a3b2f7d.js.map
