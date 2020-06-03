import { F as getElementsByClassName, e as insertHtmlBeforeEnd, x as getElementById, c2 as defStatbarLevel } from './calfSystem-03895320.js';
import './intValue-f7827250.js';
import { v as valueText } from './valueText-8844d410.js';
import './padZ-5fc2cc2a.js';
import { t as timeBox, a as asInt } from './timeBox-e613e8b7.js';

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
//# sourceMappingURL=injectLevelupCalculator-10bde417.js.map
