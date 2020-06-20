import { g as getElementsByTagName, p as pCC, d as defTable, k as on, A as setInnerHtml, B as getText } from './calfSystem-b0234231.js';
import { d as dataRows } from './dataRows-14f27163.js';
import { f as formToUrl } from './formToUrl-a03ba266.js';
import { s as searchPlayerHref } from './searchPlayerHref-c70920c5.js';

function globalQuestAllowBack(topTable) { // jQuery
  const thisSelect = getElementsByTagName('select', topTable)[0];
  $(thisSelect).off();
  on(pCC, 'change', (e) => formToUrl(e.target.form));
}

function playerLink(el) {
  const aCell = el.cells[1];
  setInnerHtml(searchPlayerHref(getText(aCell)), aCell);
}

function globalQuest() {
  const topTable = getElementsByTagName(defTable, pCC)[3];
  globalQuestAllowBack(topTable);
  dataRows(topTable.rows, 4, 1).forEach(playerLink);
}

export default globalQuest;
//# sourceMappingURL=globalQuest-b2b92b61.js.map
