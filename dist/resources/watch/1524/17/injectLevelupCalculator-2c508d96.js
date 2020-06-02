import { F as getElementsByClassName, e as insertHtmlBeforeEnd, x as getElementById, c1 as defStatbarLevel } from './calfSystem-f6498976.js';
import './intValue-5c91f5c6.js';
import { v as valueText } from './valueText-8be798ad.js';
import './padZ-337f29f0.js';
import { t as timeBox, a as asInt } from './timeBox-3f021ec0.js';

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
//# sourceMappingURL=injectLevelupCalculator-2c508d96.js.map
