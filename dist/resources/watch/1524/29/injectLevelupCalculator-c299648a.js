import { I as getElementsByClassName, f as insertHtmlBeforeEnd, y as getElementById, b_ as defStatbarLevel } from './calfSystem-b31646eb.js';
import './intValue-f94761c7.js';
import { v as valueText } from './valueText-31e23dfe.js';
import './padZ-a3ed1fe1.js';
import { t as timeBox, a as asInt } from './timeBox-e0c28f80.js';

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
//# sourceMappingURL=injectLevelupCalculator-c299648a.js.map
