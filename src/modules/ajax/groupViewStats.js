import {intValue} from '../support/system';

export default function groupViewStats(doc) {
  var attackElement = doc.getElementById('stat-attack');
  var defenseElement = doc.getElementById('stat-defense');
  var armorElement = doc.getElementById('stat-armor');
  var damageElement = doc.getElementById('stat-damage');
  var hpElement = doc.getElementById('stat-hp');
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
