import { t as timeBox, a as asInt } from './timeBox-d48a4e34.js';
import { J as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, bV as defStatbarLevel } from './calfSystem-91adbec8.js';
import { v as valueText } from './valueText-43fd27d5.js';
import './intValue-e7ef611d.js';
import './padZ-4bdbf4bf.js';

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
//# sourceMappingURL=injectLevelupCalculator-12bfc409.js.map
