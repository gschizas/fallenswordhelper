import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b_ as defStatbarLevel } from './calfSystem-d357ca6f.js';
import './intValue-e8157483.js';
import { v as valueText } from './valueText-6e721c40.js';
import './padZ-bd3dfcf9.js';
import { t as timeBox, a as asInt } from './timeBox-af3e27ff.js';

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
//# sourceMappingURL=injectLevelupCalculator-a4a7c80a.js.map
