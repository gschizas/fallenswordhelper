import { getElementById } from '../common/getElement';
import getText from '../common/getText';
import intValue from '../system/intValue';
import {
  def_statArmor,
  def_statAttack,
  def_statDamage,
  def_statDefense,
  def_statHp,
} from '../support/constants';

let attackElement;
let defenseElement;
let armorElement;
let damageElement;
let hpElement;

function getElements(doc) {
  attackElement = getElementById(def_statAttack, doc);
  defenseElement = getElementById(def_statDefense, doc);
  armorElement = getElementById(def_statArmor, doc);
  damageElement = getElementById(def_statDamage, doc);
  hpElement = getElementById(def_statHp, doc);
}

function statAsNumber(el) {
  if (el) {
    return intValue(getText(el));
  }
  return 0;
}

export default function groupViewStats(doc) {
  getElements(doc);
  return {
    attack: statAsNumber(attackElement),
    attackElement,
    defense: statAsNumber(defenseElement),
    defenseElement,
    armor: statAsNumber(armorElement),
    armorElement,
    damage: statAsNumber(damageElement),
    damageElement,
    hp: statAsNumber(hpElement),
    hpElement,
  };
}
