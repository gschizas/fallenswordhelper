import { defTable } from '../support/constants';
import getArrayByTagName from '../common/getArrayByTagName';
import getElementById from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import setInnerHtml from '../dom/setInnerHtml';

function removeStatTable(el) {
  const tde = getElementsByTagName('td', el);
  setInnerHtml(`<span id="${tde[0].id}">${
    tde[0].innerHTML.replace(/&nbsp;/g, ' ').trim()}</span> `
    + `<div class="profile-stat-bonus">${getText(tde[1])}</div>`,
  el.parentNode);
}

export default function updateStatistics() {
  const charStats = getElementsByTagName(defTable,
    getElementById('profileLeftColumn'))[0];
  getArrayByTagName(defTable, charStats).forEach(removeStatTable);
}
