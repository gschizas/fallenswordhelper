import { y as getElementById, aC as defStatAttack, aD as defStatDefense, aE as defStatArmor, aF as defStatDamage, aG as defStatHp, B as getText } from './calfSystem-c851a12c.js';
import { i as intValue } from './intValue-e4cdd281.js';

let attackElement;
let defenseElement;
let armorElement;
let damageElement;
let hpElement;

function getElements(doc) {
  attackElement = getElementById(defStatAttack, doc);
  defenseElement = getElementById(defStatDefense, doc);
  armorElement = getElementById(defStatArmor, doc);
  damageElement = getElementById(defStatDamage, doc);
  hpElement = getElementById(defStatHp, doc);
}

function statAsNumber(el) {
  if (el) {
    return intValue(getText(el));
  }
  return 0;
}

function groupViewStats(doc) {
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

export { groupViewStats as g };
//# sourceMappingURL=groupViewStats-9c1d46df.js.map
