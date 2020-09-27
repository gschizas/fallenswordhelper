import { g as getElementsByTagName, p as pCC, d as defTable, k as on, A as setInnerHtml, B as getText } from './calfSystem-0ffc234f.js';
import { d as dataRows } from './dataRows-d4134ff8.js';
import { f as formToUrl } from './formToUrl-a527c245.js';
import { s as searchPlayerHref } from './searchPlayerHref-b2baf7d6.js';

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
//# sourceMappingURL=globalQuest-55e6aaef.js.map
