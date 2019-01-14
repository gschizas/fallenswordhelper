import {getElementById} from '../../../common/getElement';
import getElementsByClassName from '../../../common/getElementsByClassName';
import {
  def_statArmor,
  def_statAttack,
  def_statDamage,
  def_statDefense,
  def_statHp
} from '../../../support/constants';

export var statLevel;
export var statDefense;
export var statAttack;
export var statDamage;
export var statArmor;
export var statHp;

function getStatText(statTooltip, statClassName) {
  return getElementsByClassName(statClassName, statTooltip)[0]
    .nextElementSibling.textContent;
}

function getTooltipStats(statTooltip) {
  statAttack = getStatText(statTooltip, def_statAttack);
  statDefense = getStatText(statTooltip, def_statDefense);
  statArmor = getStatText(statTooltip, def_statArmor);
  statDamage = getStatText(statTooltip, def_statDamage);
  statHp = getStatText(statTooltip, def_statHp);
}

export function getMyStats() {
  statLevel = GameData.player().level;
  getTooltipStats(getElementById('statbar-character-tooltip-stats'));
}
