import addCommas from '../system/addCommas';
import getMercStats from '../ajax/getMercStats';
import groupViewStats from '../ajax/groupViewStats';

var groupStats;

function displayStat(el, groupStat, mercStat) {
  el.innerHTML = '<span class="fshBlue">' + addCommas(groupStat) + '</span>' +
    ' ( ' + addCommas(groupStat - mercStat) + ' )';
}

function parseMercStats(mercStats) {
  displayStat(groupStats.attackElement, groupStats.attack, mercStats.attack);
  displayStat(groupStats.defenseElement, groupStats.defense, mercStats.defense);
  displayStat(groupStats.armorElement, groupStats.armor, mercStats.armor);
  displayStat(groupStats.damageElement, groupStats.damage, mercStats.damage);
  displayStat(groupStats.hpElement, groupStats.hp, mercStats.hp);
}

export default function injectGroupStats() { // jQuery
  if (typeof $ !== 'function') {return;}
  groupStats = groupViewStats(document);
  if (groupStats.attackElement) {
    getMercStats().done(parseMercStats);
  }
}
