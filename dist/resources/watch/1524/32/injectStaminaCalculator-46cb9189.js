import { t as timeBox, a as asInt } from './timeBox-5fd6848a.js';
import { J as getElementsByClassName, y as getElementById, f as insertHtmlBeforeEnd } from './calfSystem-e64be67d.js';
import { i as intValue } from './intValue-da5ad0eb.js';
import { v as valueText } from './valueText-9ff440bc.js';
import './padZ-0fd2ec23.js';

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
  if (stamVals) {
    insertHtmlBeforeEnd(staminaMouseover, maxStamAt(nextGain, stamVals));
  }
}

export default injectStaminaCalculator;
//# sourceMappingURL=injectStaminaCalculator-46cb9189.js.map
