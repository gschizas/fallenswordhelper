import { g as getElementsByTagName, p as pCC, d as defTable, f as on, A as setInnerHtml, B as getText } from './calfSystem-c0288c6c.js';
import { d as dataRows } from './dataRows-18018f77.js';
import { f as formToUrl } from './formToUrl-112a5041.js';
import { s as searchPlayerHref } from './searchPlayerHref-fedaa1ae.js';

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
//# sourceMappingURL=globalQuest-5898492b.js.map
