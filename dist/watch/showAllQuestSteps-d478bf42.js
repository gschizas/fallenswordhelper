import { G as getValue, M as querySelectorArray, A as getElementById } from './calfSystem-cb5d894f.js';

function showStep(e) { e.style.display = 'block'; }

function showAllQuestSteps() {
  if (!getValue('showNextQuestSteps')) { return; }
  querySelectorArray('div[id^="stage"]').forEach(showStep);
  getElementById('next_stage_button').style.display = 'none';
}

export default showAllQuestSteps;
//# sourceMappingURL=showAllQuestSteps-d478bf42.js.map
