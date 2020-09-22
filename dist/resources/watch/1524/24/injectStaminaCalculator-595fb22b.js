import { I as getElementsByClassName, y as getElementById, f as insertHtmlBeforeEnd } from './calfSystem-dea093d3.js';
import { i as intValue } from './intValue-44683b42.js';
import { v as valueText } from './valueText-63491c45.js';
import './padZ-cba8efb8.js';
import { t as timeBox, a as asInt } from './timeBox-3de3f1ac.js';

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
//# sourceMappingURL=injectStaminaCalculator-595fb22b.js.map
