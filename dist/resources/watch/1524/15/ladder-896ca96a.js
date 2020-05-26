import { M as querySelector, p as pCC, o as onclick, k as getArrayByTagName, aP as contains, ax as arrayFrom, aQ as getTextTrim, aR as insertHtmlAfterBegin, D as getValue, aA as now, y as setText, z as setInnerHtml, i as insertElement } from './calfSystem-b469667c.js';
import { d as dontPost } from './dontPost-b432474a.js';
import { p as playerName } from './playerName-701fa211.js';
import { a as addCommas } from './addCommas-e9d41e91.js';
import { i as intValue } from './intValue-8eb7c4cb.js';
import { c as createTr } from './createTr-6778862a.js';
import { o as outputFormat } from './outputFormat-4ee3cbd2.js';

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
  const lastLadderReset = getValue('lastLadderReset');
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
//# sourceMappingURL=ladder-896ca96a.js.map
