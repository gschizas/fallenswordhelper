import { F as getElementsByClassName, x as getElementById, e as insertHtmlBeforeEnd } from './calfSystem-f6498976.js';
import { i as intValue } from './intValue-5c91f5c6.js';
import { v as valueText } from './valueText-8be798ad.js';
import './padZ-337f29f0.js';
import { t as timeBox, a as asInt } from './timeBox-3f021ec0.js';

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
//# sourceMappingURL=injectStaminaCalculator-5185cc6e.js.map
