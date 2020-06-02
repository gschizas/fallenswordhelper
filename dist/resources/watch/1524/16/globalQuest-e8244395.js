import { g as getElementsByTagName, f as on, r as partial, p as pCC, d as defTable, z as setInnerHtml, A as getText } from './calfSystem-6e4b53e3.js';
import { d as dontPost } from './dontPost-2be1889c.js';
import { d as dataRows } from './dataRows-ca15bfda.js';
import { s as searchPlayerHref } from './searchPlayerHref-f74f78ff.js';

function allowBack(topTable) { // jQuery
  const thisSelect = getElementsByTagName('select', topTable)[0];
  $(thisSelect).off();
  on(thisSelect, 'change', partial(dontPost, pCC));
}

function playerLink(el) {
  const aCell = el.cells[1];
  setInnerHtml(searchPlayerHref(getText(aCell)), aCell);
}

function globalQuest() {
  const topTable = getElementsByTagName(defTable, pCC)[3];
  allowBack(topTable);
  dataRows(topTable.rows, 4, 1).forEach(playerLink);
}

export default globalQuest;
//# sourceMappingURL=globalQuest-e8244395.js.map
