import {getElementById} from '../common/getElement';
import {intValue} from '../system/system';

function statAsNumber(el) {
  if (el) {
    return intValue(el.textContent);
  }
  return 0;
}

export default function groupViewStats(doc) {
  var attackElement = getElementById('stat-attack', doc);
  var defenseElement = getElementById('stat-defense', doc);
  var armorElement = getElementById('stat-armor', doc);
  var damageElement = getElementById('stat-damage', doc);
  var hpElement = getElementById('stat-hp', doc);
  return {
    attack: statAsNumber(attackElement),
    attackElement: attackElement,
    defense: statAsNumber(defenseElement),
    defenseElement: defenseElement,
    armor: statAsNumber(armorElement),
    armorElement: armorElement,
    damage: statAsNumber(damageElement),
    damageElement: damageElement,
    hp: statAsNumber(hpElement),
    hpElement: hpElement
  };
}
