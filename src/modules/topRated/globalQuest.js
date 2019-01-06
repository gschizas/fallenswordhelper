import {def_table} from '../support/constants';
import getElementsByTagName from '../common/getElementsByTagName';
import myRows from '../common/myRows';
import {pCC} from '../support/layout';

export default function globalQuest() {
  var topTable = getElementsByTagName(def_table, pCC)[3];
  Array.from(topTable.rows).filter(myRows(4, 1)).forEach(function(el) {
    var aCell = el.cells[1];
    aCell.innerHTML = '<a href="index.php?cmd=findplayer' +
      '&search_show_first=1&search_active=1&search_username=' +
      aCell.textContent + '">' + aCell.textContent + '</a>';
  });
}
