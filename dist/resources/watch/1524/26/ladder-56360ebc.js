import { m as getArrayByTagName, p as pCC, a4 as contains, M as arrayFrom, K as getTextTrim, a5 as insertHtmlAfterBegin, G as getValue, a6 as now, a7 as defLastLadderReset, z as setText, A as setInnerHtml, D as querySelector, i as insertElement } from './calfSystem-c851a12c.js';
import { p as playerName } from './playerName-c2417987.js';
import { a as addCommas } from './addCommas-b567f740.js';
import { i as intValue } from './intValue-e4cdd281.js';
import './formToUrl-19af2e75.js';
import { i as interceptSubmit } from './interceptSubmit-ad55085a.js';
import { o as outputFormat } from './outputFormat-007d893f.js';
import { c as createTr } from './createTr-9936325c.js';

function isMyRow(thisRow) {
  return thisRow.cells.length > 1
    && getTextTrim(thisRow.cells[1]) === playerName();
}

function prepareRow(thisRow) {
  const pvpRating = intValue(getTextTrim(thisRow.cells[3]));
  insertHtmlAfterBegin(thisRow.cells[3],
    `<span class="fshBlue fshXSmall">(${
      addCommas(pvpRating - 250)})</span>&nbsp;`);
}

function margin() {
  const vlHeader = getArrayByTagName('td', pCC).filter(contains('VL'));
  if (vlHeader.length === 1) {
    const thisRows = vlHeader[0].parentNode.parentNode.rows;
    arrayFrom(thisRows).filter(isMyRow).forEach(prepareRow);
  }
}

function formatLastReset(lastLadderReset) {
  let m = Math.floor((now - lastLadderReset) / 60000);
  const h = Math.floor(m / 60);
  m %= 60;
  return `${outputFormat(h, ' hours, ') + m} mins`;
}

function formatTime() {
  const lastLadderReset = getValue(defLastLadderReset);
  if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
    return '<span class="fshLink tip-static" data-tipped="FSH has not seen '
      + 'the last ladder reset.<br>You can find it in your log if you '
      + 'qualified<br>or Tavern Rumours.">???</span>';
  }
  return formatLastReset(lastLadderReset);
}

function makeLeftCell(newRow) {
  const leftCell = newRow.insertCell(-1);
  leftCell.height = 25;
  setText('Last Reset:', leftCell);
}

function makeRightCell(newRow) {
  const rightCell = newRow.insertCell(-1);
  rightCell.align = 'right';
  setInnerHtml(formatTime(), rightCell);
}

function makeNewRow() {
  const newRow = createTr();
  makeLeftCell(newRow);
  makeRightCell(newRow);
  return newRow;
}

function lastReset() {
  const topTable = querySelector('#pCC table');
  const newRow = makeNewRow();
  insertElement(topTable, newRow);
}

function ladder() {
  interceptSubmit();
  if (getValue('trackLadderReset')) {
    lastReset();
  }
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  Ladder Margin
    margin();
  }
}

export default ladder;
//# sourceMappingURL=ladder-56360ebc.js.map
