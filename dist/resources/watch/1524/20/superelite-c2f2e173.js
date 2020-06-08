import { x as jQueryNotPresent, A as setInnerHtml, f as on, c as calf, e as insertHtmlBeforeEnd, i as insertElement, s as partial, p as pCC, m as entries, V as setValue } from './calfSystem-c0288c6c.js';
import './numberIsNaN-0a1aaf72.js';
import './idb-247b069e.js';
import './isChecked-1ec16a19.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-988113ef.js';
import { c as createTBody } from './createTBody-71ba3548.js';
import { c as createTable } from './createTable-f5cad5e0.js';
import './isDate-92caaa71.js';
import './padZ-fdb87b04.js';
import { getFshSeLog, oldLog, disableBackgroundChecks, doBackgroundCheck } from './seLog-52627d06.js';
import { f as formatUtcDateTime } from './formatUtcDateTime-d2f807ed.js';

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

function superelite() {
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

export default superelite;
//# sourceMappingURL=superelite-c2f2e173.js.map
