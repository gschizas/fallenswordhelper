import * as system from '../support/system';

export default function showAllQuestSteps() {
  if (!system.getValue('showNextQuestSteps')) {return;}
  Array.prototype.forEach.call(document.querySelectorAll('div[id^="stage"]'),
    function(e) {e.style.display = 'block';});
  document.getElementById('next_stage_button').style.display = 'none';
}
