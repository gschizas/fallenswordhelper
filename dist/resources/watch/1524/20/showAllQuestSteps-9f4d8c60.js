import { G as getValue, E as querySelectorArray, y as getElementById } from './calfSystem-c0288c6c.js';

function showStep(e) { e.style.display = 'block'; }

function showAllQuestSteps() {
  if (!getValue('showNextQuestSteps')) { return; }
  querySelectorArray('div[id^="stage"]').forEach(showStep);
  getElementById('next_stage_button').style.display = 'none';
}

export default showAllQuestSteps;
//# sourceMappingURL=showAllQuestSteps-9f4d8c60.js.map
