import {getElementById} from '../common/getElement';

function removeStatTable(el) {
  var tde = el.getElementsByTagName('td');
  el.parentNode.innerHTML = tde[0].innerHTML.replace(/&nbsp;/g, ' ') +
    '<div class="profile-stat-bonus">' + tde[1].textContent + '</div>';
}

export default function updateStatistics() {
  var charStats = getElementById('profileLeftColumn')
    .getElementsByTagName('table')[0];
  var dodgyTables = charStats.getElementsByTagName('table');
  Array.prototype.forEach.call(dodgyTables, removeStatTable);
}
