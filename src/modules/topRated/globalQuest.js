import dataRows from '../common/dataRows';
import { defTable } from '../support/constants';
import formToUrl from '../common/formToUrl';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import on from '../common/on';
import { pCC } from '../support/layout';
import searchPlayerHref from '../common/searchPlayerHref';
import setInnerHtml from '../dom/setInnerHtml';

function globalQuestAllowBack(topTable) { // jQuery
  const thisSelect = getElementsByTagName('select', topTable)[0];
  $(thisSelect).off();
  on(pCC, 'change', (e) => formToUrl(e.target.form));
}

function playerLink(el) {
  const aCell = el.cells[1];
  setInnerHtml(searchPlayerHref(getText(aCell)), aCell);
}

export default function globalQuest() {
  const topTable = getElementsByTagName(defTable, pCC)[3];
  globalQuestAllowBack(topTable);
  dataRows(topTable.rows, 4, 1).forEach(playerLink);
}
