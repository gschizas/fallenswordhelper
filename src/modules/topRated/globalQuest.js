import getElementsByTagName from '../common/getElementsByTagName';
import myRows from '../common/myRows';
import {pCC} from '../support/layout';
import {def_table, showPlayerUrl} from '../support/constants';

export default function globalQuest() {
  var topTable = getElementsByTagName(def_table, pCC)[3];
  Array.from(topTable.rows).filter(myRows(4, 1)).forEach(function(el) {
    var aCell = el.cells[1];
    aCell.innerHTML = '<a href="' + showPlayerUrl +
      aCell.textContent + '">' + aCell.textContent + '</a>';
  });
}
