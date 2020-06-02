import { N as querySelector, p as pCC, o as onclick, k as getArrayByTagName, a2 as contains, a3 as arrayFrom, a4 as getTextTrim, a5 as insertHtmlAfterBegin, D as getValue, a6 as now, a7 as defLastLadderReset, y as setText, z as setInnerHtml, i as insertElement } from './calfSystem-6e4b53e3.js';
import { d as dontPost } from './dontPost-2be1889c.js';
import { p as playerName } from './playerName-43cf6aad.js';
import { a as addCommas } from './addCommas-7c72e02d.js';
import { i as intValue } from './intValue-8ba42bf3.js';
import { c as createTr } from './createTr-3f08cffe.js';
import { o as outputFormat } from './outputFormat-00dcb509.js';

function updateUrl(e) {
  e.preventDefault();
  dontPost(pCC);
}

function allowBack() {
  const submitButton = querySelector('input[type="submit"]', pCC);
  if (submitButton) {
    onclick(submitButton, updateUrl);
  }
}

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
  allowBack();
  if (getValue('trackLadderReset')) {
    lastReset();
  }
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  Ladder Margin
    margin();
  }
}

export default ladder;
//# sourceMappingURL=ladder-894a3131.js.map
