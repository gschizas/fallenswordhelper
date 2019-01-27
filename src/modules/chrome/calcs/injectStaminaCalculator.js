import asInt from './asInt';
import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import intValue from '../../system/intValue';
import timeBox from './timeBox';
import valueText from '../../common/valueText';

function getStamVals(staminaMouseover) {
  return /([,0-9]+)\s\/\s([,0-9]+)/.exec(
    valueText(getElementsByClassName('stat-name', staminaMouseover))
  );
}

function maxStamAt(nextGain, stamVals) {
  return '<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>' +
    timeBox(
      valueText(nextGain),
      // get the max hours to still be inside stamina maximum
      Math.floor(
        (intValue(stamVals[2]) - intValue(stamVals[1])) /
        asInt('stat-stamina-gainPerHour')
      )
    );
}

export default function injectStaminaCalculator() {
  var nextGain = getElementsByClassName('stat-stamina-nextGain');
  if (nextGain.length === 0) {return;}
  var staminaMouseover = getElementById('statbar-stamina-tooltip-stamina');
  var stamVals = getStamVals(staminaMouseover);
  insertHtmlBeforeEnd(staminaMouseover, maxStamAt(nextGain, stamVals));
}
