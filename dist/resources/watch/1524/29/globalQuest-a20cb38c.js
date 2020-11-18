import { g as getElementsByTagName, p as pCC, d as defTable, k as on, A as setInnerHtml, B as getText } from './calfSystem-b31646eb.js';
import { d as dataRows } from './dataRows-af2f1179.js';
import { f as formToUrl } from './formToUrl-16cc4fc0.js';
import { s as searchPlayerHref } from './searchPlayerHref-cc53b9e8.js';

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
//# sourceMappingURL=globalQuest-a20cb38c.js.map
