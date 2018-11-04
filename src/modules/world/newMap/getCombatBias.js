import {bias} from './assets';
import calf from '../../support/calf';
import getValue from '../../system/getValue';

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
