import insertElement from '../../../common/insertElement';
import partial from '../../../common/partial';

// colSpan = attributes[0]
// anElement = attributes[1]
// isHeader = attributes[2]

function addNextCell(row, attributes) {
  var aCell = row.insertCell(-1);
  aCell.colSpan = attributes[0];
  if (attributes[2]) {aCell.className = 'header';}
  insertElement(aCell, attributes[1]);
  return aCell;
}

function addRowCells(aRow, someCells) {
  someCells.forEach(partial(addNextCell, aRow));
}

function addNextRow(tbl, cells, isBlue) {
  var aRow = tbl.insertRow(-1);
  if (isBlue) {aRow.className = 'fshBlue';}
  addRowCells(aRow, cells);
  return aRow;
}

function addRow(tbl, row) {
  addNextRow(tbl, row[0], row[1]);
}

export function addRows(tbl, rows) {
  rows.forEach(partial(addRow, tbl));
}
