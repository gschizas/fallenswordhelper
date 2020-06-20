import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b$ as defStatbarLevel } from './calfSystem-b0234231.js';
import './intValue-639b8a5f.js';
import { v as valueText } from './valueText-d30c1f8a.js';
import './padZ-9007fca7.js';
import { t as timeBox, a as asInt } from './timeBox-8d477d6d.js';

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
//# sourceMappingURL=injectLevelupCalculator-8b2dc4ab.js.map
