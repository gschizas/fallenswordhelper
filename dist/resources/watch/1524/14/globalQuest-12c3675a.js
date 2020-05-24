import { g as getElementsByTagName, l as on, u as partial, p as pCC, b as defTable, C as setInnerHtml, D as getText } from './calfSystem-43606e5e.js';
import { d as dontPost } from './dontPost-4ce1ffd1.js';
import { d as dataRows } from './dataRows-e87a3e05.js';
import { s as searchPlayerHref } from './searchPlayerHref-fd4ffb89.js';

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
//# sourceMappingURL=globalQuest-12c3675a.js.map
