import { I as getElementsByClassName, y as getElementById, f as insertHtmlBeforeEnd } from './calfSystem-b0234231.js';
import { i as intValue } from './intValue-639b8a5f.js';
import { v as valueText } from './valueText-d30c1f8a.js';
import './padZ-9007fca7.js';
import { t as timeBox, a as asInt } from './timeBox-8d477d6d.js';

function getStamVals(staminaMouseover) {
  return /([,0-9]+)\s\/\s([,0-9]+)/.exec(
    valueText(getElementsByClassName('stat-name', staminaMouseover)),
  );
}

function maxStamAt(nextGain, stamVals) {
  return `<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${
    timeBox(
      valueText(nextGain),
      // get the max hours to still be inside stamina maximum
      Math.floor(
        (intValue(stamVals[2]) - intValue(stamVals[1]))
        / asInt('stat-stamina-gainPerHour'),
      ),
    )}`;
}

function injectStaminaCalculator() {
  const nextGain = getElementsByClassName('stat-stamina-nextGain');
  if (nextGain.length === 0) { return; }
  const staminaMouseover = getElementById('statbar-stamina-tooltip-stamina');
  const stamVals = getStamVals(staminaMouseover);
  insertHtmlBeforeEnd(staminaMouseover, maxStamAt(nextGain, stamVals));
}

export default injectStaminaCalculator;
//# sourceMappingURL=injectStaminaCalculator-98823de8.js.map
