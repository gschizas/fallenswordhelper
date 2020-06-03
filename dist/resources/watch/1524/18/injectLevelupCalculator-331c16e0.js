import { F as getElementsByClassName, e as insertHtmlBeforeEnd, x as getElementById, c2 as defStatbarLevel } from './calfSystem-940bc1b5.js';
import './intValue-883414eb.js';
import { v as valueText } from './valueText-27f15089.js';
import './padZ-cdefdbb9.js';
import { t as timeBox, a as asInt } from './timeBox-31f36216.js';

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
//# sourceMappingURL=injectLevelupCalculator-331c16e0.js.map
