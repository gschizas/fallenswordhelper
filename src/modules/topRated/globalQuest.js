import allowBack from './allowBack';
import dataRows from '../common/dataRows';
import { defTable } from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import getText from '../common/getText';
import { pCC } from '../support/layout';
import searchPlayerHref from '../common/searchPlayerHref';
import setInnerHtml from '../dom/setInnerHtml';

function playerLink(el) {
  const aCell = el.cells[1];
  setInnerHtml(searchPlayerHref(getText(aCell)), aCell);
}

export default function globalQuest() {
  const topTable = getElementsByTagName(defTable, pCC)[3];
  allowBack(topTable);
  dataRows(topTable.rows, 4, 1).forEach(playerLink);
}
