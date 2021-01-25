import { t as timeBox, a as asInt } from './timeBox-5fd6848a.js';
import { J as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, bW as defStatbarLevel } from './calfSystem-e64be67d.js';
import { v as valueText } from './valueText-9ff440bc.js';
import './intValue-da5ad0eb.js';
import './padZ-0fd2ec23.js';

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
//# sourceMappingURL=injectLevelupCalculator-d94dd86c.js.map
