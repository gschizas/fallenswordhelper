import allowBack from './allowBack';
import {createTr} from '../common/cElement';
import getValue from '../system/getValue';
import insertElement from '../common/insertElement';
import {now} from '../support/constants';
import outputFormat from '../system/outputFormat';
import setText from '../common/setText';

function formatLastReset(lastLadderReset) {
  var m = Math.floor((now - lastLadderReset) / 60000);
  var h = Math.floor(m / 60);
  m %= 60;
  return outputFormat(h, ' hours, ') + m + ' mins';
}

function formatTime() {
  var lastLadderReset = getValue('lastLadderReset');
  if (lastLadderReset < now - 48 * 60 * 60 * 1000) {
    return '<span class="fshLink tip-static" data-tipped="FSH has not seen ' +
      'the last ladder reset.<br>You can find it in your log if you ' +
      'qualified<br>or Tavern Rumours.">???</span>';
  }
  return formatLastReset(lastLadderReset);
}

function makeLeftCell(newRow) {
  var leftCell = newRow.insertCell(-1);
  leftCell.height = 25;
  setText('Last Reset:', leftCell);
}

function makeRightCell(newRow) {
  var rightCell = newRow.insertCell(-1);
  rightCell.align = 'right';
  rightCell.innerHTML = formatTime();
}

function makeNewRow() {
  var newRow = createTr();
  makeLeftCell(newRow);
  makeRightCell(newRow);
  return newRow;
}

function lastReset() {
  var topTable = document.querySelector('#pCC table');
  var newRow = makeNewRow();
  insertElement(topTable, newRow);
}

export default function ladder() {
  allowBack();
  lastReset();
}
