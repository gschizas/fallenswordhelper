import calf from '../support/calf';
import createTBody from '../common/cElement/createTBody';
import createTable from '../common/cElement/createTable';
import entries from '../common/entries';
import formatUtcDateTime from '../common/formatUtcDateTime';
import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import { pCC } from '../support/layout';
import partial from '../common/partial';
import setInnerHtml from '../dom/setInnerHtml';
import setValue from '../system/setValue';
import { simpleCheckboxHtml } from '../settings/simpleCheckbox';
import {
  disableBackgroundChecks,
  doBackgroundCheck,
  getFshSeLog,
  oldLog,
} from './seLog';

const enableSeTracker = 'enableSeTracker';
let trackerCell;

function addRow(trackerTable, se) {
  insertHtmlBeforeEnd(trackerTable,
    `<tr><td class="fshCenter">${se[0]}</td>`
    + `<td class="fshBold fshCenter fshCooldown">${
      formatUtcDateTime(new Date(se[1] * 1000))}</td></tr>`);
}

function buildTrackerTable(seAry) {
  const trackerTable = createTable({ className: 'fshTTracker' });
  const tBody = createTBody({
    innerHTML: '<tr><td class="header fshCenter">Creature</td>'
      + '<td class="header fshCenter">Last Kill</td></tr>',
  });
  insertElement(trackerTable, tBody);
  seAry.forEach(partial(addRow, tBody));
  return trackerTable;
}

function insertNewRow() {
  const newRow = pCC.lastElementChild.insertRow(-1);
  const newCell = newRow.insertCell(-1);
  newCell.colSpan = 3;
  return newCell;
}

function displayTracker(seAry) {
  const trackerTable = buildTrackerTable(seAry);
  trackerCell = insertNewRow();
  insertElement(trackerCell, trackerTable);
}

function valueNumeric(a, b) { return a[1] - b[1]; }

function gotSeLog() {
  if (oldLog && oldLog.se) {
    displayTracker(entries(oldLog.se).sort(valueNumeric));
  }
}

function killTable() {
  if (!calf.enableSeTracker) {
    if (trackerCell) {
      trackerCell.parentNode.remove();
      trackerCell = false;
    }
    disableBackgroundChecks();
  } else {
    doBackgroundCheck().finally(gotSeLog);
  }
}

function togglePref(evt) {
  if (evt.target.id === enableSeTracker) {
    calf.enableSeTracker = !calf.enableSeTracker;
    setValue(enableSeTracker, calf.enableSeTracker);
    killTable();
  }
}

function waitForLog() {
  doBackgroundCheck().finally(gotSeLog);
}

export default function superelite() {
  if (jQueryNotPresent()) { return; }
  let newCell = insertNewRow();
  newCell.height = 20;
  newCell = insertNewRow();
  newCell.className = 'fshCenter';
  setInnerHtml(simpleCheckboxHtml(enableSeTracker), newCell);
  on(newCell, 'change', togglePref);
  if (calf.enableSeTracker) {
    getFshSeLog().then(waitForLog);
  }
}
