import asInt from './asInt';
import {getElementById} from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import timeBox from './timeBox';
import valueText from './valueText';

export default function injectLevelupCalculator() {
  var nextGain = getElementsByClassName('stat-xp-nextGain');
  if (nextGain.length === 0) {return;}
  insertHtmlBeforeEnd(getElementById('statbar-level-tooltip-general'),
    '<dt class="stat-xp-nextLevel">Next Level At</dt>' +
    timeBox(
      valueText(nextGain),
      Math.ceil(asInt('stat-xp-remaining') / asInt('stat-xp-gainPerHour'))
    )
  );
}
