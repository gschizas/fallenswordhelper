import { g as getElementsByTagName, y as getElementById, d as defTable, l as getArrayByTagName, A as setInnerHtml, B as getText } from './calfSystem-c0288c6c.js';

function removeStatTable(el) {
  const tde = getElementsByTagName('td', el);
  setInnerHtml(`<span id="${tde[0].id}">${
    tde[0].innerHTML.replace(/&nbsp;/g, ' ').trim()}</span> `
    + `<div class="profile-stat-bonus">${getText(tde[1])}</div>`,
  el.parentNode);
}

function updateStatistics() {
  const charStats = getElementsByTagName(defTable,
    getElementById('profileLeftColumn'))[0];
  getArrayByTagName(defTable, charStats).forEach(removeStatTable);
}

export default updateStatistics;
//# sourceMappingURL=updateStatistics-a453cdb8.js.map
