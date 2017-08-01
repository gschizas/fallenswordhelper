import * as system from '../support/system';

export default function groupViewStats(doc) {
  var attackElement = doc.getElementById('stat-attack');
  var defenseElement = doc.getElementById('stat-defense');
  var armorElement = doc.getElementById('stat-armor');
  var damageElement = doc.getElementById('stat-damage');
  var hpElement = doc.getElementById('stat-hp');
  return {
    attack: system.intValue(attackElement.textContent),
    attackElement: attackElement,
    defense: system.intValue(defenseElement.textContent),
    defenseElement: defenseElement,
    armor: system.intValue(armorElement.textContent),
    armorElement: armorElement,
    damage: system.intValue(damageElement.textContent),
    damageElement: damageElement,
    hp: system.intValue(hpElement.textContent),
    hpElement: hpElement
  };
}
