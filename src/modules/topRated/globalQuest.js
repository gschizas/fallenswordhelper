import {def_table} from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import {pCC} from '../support/layout';

export default function globalQuest() {
  var topTable = getElementsByTagName(def_table, pCC)[3];
  for (var i = 2; i < topTable.rows.length; i += 4) {
    var aCell = topTable.rows[i].cells[1];
    aCell.innerHTML = '<a href="index.php?cmd=findplayer' +
      '&search_show_first=1&search_active=1&search_username=' +
      aCell.textContent + '">' + aCell.textContent + '</a>';
  }
}
