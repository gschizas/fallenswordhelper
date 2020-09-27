import { I as getElementsByClassName, y as getElementById, f as insertHtmlBeforeEnd } from './calfSystem-0ffc234f.js';
import { i as intValue } from './intValue-65d3c36c.js';
import { v as valueText } from './valueText-173142a3.js';
import './padZ-0c2f5370.js';
import { t as timeBox, a as asInt } from './timeBox-49cfc9d4.js';

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
//# sourceMappingURL=injectStaminaCalculator-a5a6fa56.js.map
