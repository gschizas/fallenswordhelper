import {getElementById} from '../common/getElement';
import {intValue} from '../system/system';

export default function groupViewStats(doc) {
  var attackElement = getElementById('stat-attack', doc);
  var defenseElement = getElementById('stat-defense', doc);
  var armorElement = getElementById('stat-armor', doc);
  var damageElement = getElementById('stat-damage', doc);
  var hpElement = getElementById('stat-hp', doc);
  return {
    attack: intValue(attackElement.textContent),
    attackElement: attackElement,
    defense: intValue(defenseElement.textContent),
    defenseElement: defenseElement,
    armor: intValue(armorElement.textContent),
    armorElement: armorElement,
    damage: intValue(damageElement.textContent),
    damageElement: damageElement,
    hp: intValue(hpElement.textContent),
    hpElement: hpElement
  };
}
