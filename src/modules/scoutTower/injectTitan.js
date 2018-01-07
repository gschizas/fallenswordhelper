import {pCC} from '../support/layout';

export default function injectTitan() {
  var titanTable = pCC.children[0];
  var newRow = titanTable.insertRow(2);
  newRow.insertAdjacentHTML('beforeend', '<br>');
  newRow = titanTable.insertRow(3);
  newRow.insertAdjacentHTML('beforeend', '<td class="fshCenter fshBold">[ ' +
    '<a href="index.php?cmd=guild&subcmd=scouttower">Scout Tower</a> ]</td>');
}
