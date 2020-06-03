import { F as getElementsByClassName, x as getElementById, e as insertHtmlBeforeEnd } from './calfSystem-940bc1b5.js';
import { i as intValue } from './intValue-883414eb.js';
import { v as valueText } from './valueText-27f15089.js';
import './padZ-cdefdbb9.js';
import { t as timeBox, a as asInt } from './timeBox-31f36216.js';

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
//# sourceMappingURL=injectStaminaCalculator-172164b2.js.map
