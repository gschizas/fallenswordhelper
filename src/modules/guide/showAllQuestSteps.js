import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import querySelectorArray from '../common/querySelectorArray';

function showStep(e) {e.style.display = 'block';}

export default function showAllQuestSteps() {
  if (!getValue('showNextQuestSteps')) {return;}
  querySelectorArray('div[id^="stage"]').forEach(showStep);
  getElementById('next_stage_button').style.display = 'none';
}
