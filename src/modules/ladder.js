import {createTr} from './common/cElement';
import getValue from './system/getValue';
import insertElement from './common/insertElement';
import on from './common/on';
import outputFormat from './system/outputFormat';
import {cmdUrl, now} from './support/constants';

function updateUrl(e) {
  e.preventDefault();
  window.location = cmdUrl + 'pvpladder&viewing_band_id=' +
    document.querySelector('#pCC select[name="viewing_band_id"]').value;
}

function dontPost() {
  var submitButton = document.querySelector('#pCC input[type="submit"]');
  if (submitButton) {
    on(submitButton, 'click', updateUrl);
  }
}

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
  leftCell.textContent = 'Last Reset:';
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
  dontPost();
  lastReset();
}
