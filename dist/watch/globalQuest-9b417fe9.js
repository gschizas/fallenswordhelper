import { g as getElementsByTagName, l as on, u as partial, p as pCC, b as defTable, C as setInnerHtml, D as getText } from './calfSystem-cb5d894f.js';
import { d as dontPost } from './dontPost-f7f61941.js';
import { d as dataRows } from './dataRows-a7369ebb.js';
import { s as searchPlayerHref } from './searchPlayerHref-fa7a32b4.js';

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
//# sourceMappingURL=globalQuest-9b417fe9.js.map
