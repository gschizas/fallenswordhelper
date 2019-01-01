import {def_table} from '../support/constants';
import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';

function removeStatTable(el) {
  var tde = getElementsByTagName('td', el);
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' + tde[1].textContent + '</div>';
}

export default function updateStatistics() {
  var charStats = getElementsByTagName(def_table,
    getElementById('profileLeftColumn'))[0];
  var dodgyTables = getElementsByTagName(def_table, charStats);
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}
