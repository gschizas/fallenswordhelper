import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {pCC} from '../support/layout';

export default function injectTitan() {
  var titanTable = pCC.children[0];
  var newRow = titanTable.insertRow(2);
  insertHtmlBeforeEnd(newRow, '<br>');
  newRow = titanTable.insertRow(3);
  insertHtmlBeforeEnd(newRow, '<td class="fshCenter fshBold">[ ' +
    '<a href="index.php?cmd=guild&subcmd=scouttower">Scout Tower</a> ]</td>');
}
