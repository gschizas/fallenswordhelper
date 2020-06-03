import { g as getElementsByTagName, f as on, r as partial, p as pCC, d as defTable, z as setInnerHtml, A as getText } from './calfSystem-940bc1b5.js';
import { d as dontPost } from './dontPost-2931988f.js';
import { d as dataRows } from './dataRows-ef529462.js';
import { s as searchPlayerHref } from './searchPlayerHref-182ca2e0.js';

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
//# sourceMappingURL=globalQuest-c61e5e6d.js.map
