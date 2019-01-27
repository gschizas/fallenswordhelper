import asInt from './asInt';
import {def_statbarLevel} from '../../support/constants';
import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import timeBox from './timeBox';
import valueText from '../../common/valueText';

export default function injectLevelupCalculator() {
  var nextGain = getElementsByClassName('stat-xp-nextGain');
  if (nextGain.length === 0) {return;}
  insertHtmlBeforeEnd(getElementById(def_statbarLevel),
    '<dt class="stat-xp-nextLevel">Next Level At</dt>' +
    timeBox(
      valueText(nextGain),
      Math.ceil(asInt('stat-xp-remaining') / asInt('stat-xp-gainPerHour'))
    )
  );
}
