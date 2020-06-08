import { x as jQueryNotPresent, A as setInnerHtml } from './calfSystem-c0288c6c.js';
import { a as addCommas } from './addCommas-a0838961.js';
import './intValue-e7ac83e4.js';
import { g as groupViewStats } from './groupViewStats-5c56286a.js';
import { g as getMercStats } from './getMercStats-c9b867a1.js';

let groupStats;

function displayStat(el, groupStat, mercStat) {
  setInnerHtml(`<span class="fshBlue">${addCommas(groupStat)}</span> ( ${
    addCommas(groupStat - mercStat)} )`, el);
}

function parseMercStats(mercStats) {
  displayStat(groupStats.attackElement, groupStats.attack, mercStats.attack);
  displayStat(groupStats.defenseElement, groupStats.defense, mercStats.defense);
  displayStat(groupStats.armorElement, groupStats.armor, mercStats.armor);
  displayStat(groupStats.damageElement, groupStats.damage, mercStats.damage);
  displayStat(groupStats.hpElement, groupStats.hp, mercStats.hp);
}

function injectGroupStats() { // jQuery
  if (jQueryNotPresent()) { return; }
  groupStats = groupViewStats(document);
  if (groupStats.attackElement) {
    getMercStats().then(parseMercStats);
  }
}

export default injectGroupStats;
//# sourceMappingURL=injectGroupStats-27062795.js.map
