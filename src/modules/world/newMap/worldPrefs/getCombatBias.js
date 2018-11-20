import calf from '../../../support/calf';
import getValue from '../../../system/getValue';

var bias = [
  {generalVariable: 1.1053, hpVariable: 1.1},
  {generalVariable: 1.1, hpVariable: 1.053},
  {generalVariable: 1.053, hpVariable: 1},
  {generalVariable: 1.1053, hpVariable: 1}
];

function getBiasGeneral(combatEvaluatorBias) {
  if (bias[combatEvaluatorBias]) {
    return bias[combatEvaluatorBias].generalVariable;
  }
  return 1.1053;
}

function getBiasHp(combatEvaluatorBias) {
  if (bias[combatEvaluatorBias]) {
    return bias[combatEvaluatorBias].hpVariable;
  }
  return 1.1;
}

export default function getCombatBias() {
  calf.combatEvaluatorBias = getValue('combatEvaluatorBias');
  calf.generalVariable = getBiasGeneral(calf.combatEvaluatorBias);
  calf.hpVariable = getBiasHp(calf.combatEvaluatorBias);
}
