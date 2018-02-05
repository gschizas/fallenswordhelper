import {getElementById} from '../common/getElement';
import {getValue} from '../system/system';

export default function showAllQuestSteps() {
  if (!getValue('showNextQuestSteps')) {return;}
  Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
    function(e) {e.style.display = 'block';});
  getElementById('next_stage_button').style.display = 'none';
}
