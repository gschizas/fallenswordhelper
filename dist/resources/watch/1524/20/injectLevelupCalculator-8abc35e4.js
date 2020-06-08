import { I as getElementsByClassName, e as insertHtmlBeforeEnd, y as getElementById, b_ as defStatbarLevel } from './calfSystem-c0288c6c.js';
import './intValue-e7ac83e4.js';
import { v as valueText } from './valueText-77bcf3af.js';
import './padZ-fdb87b04.js';
import { t as timeBox, a as asInt } from './timeBox-b6399625.js';

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
//# sourceMappingURL=injectLevelupCalculator-8abc35e4.js.map
