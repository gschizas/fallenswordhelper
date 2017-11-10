import formatDateTime from '../common/formatDateTime';
import {pCC} from '../support/layout';
import {simpleCheckboxHtml} from '../settings/settingsPage';
import {createTBody, createTable} from '../common/cElement';
import {
  disableBackgroundChecks,
  doBackgroundCheck,
  getSeLog,
  oldLog
} from './seLog';
import {getValue, setValue} from '../support/system';

var enableSeTracker = 'enableSeTracker';
var seTrackerEnabled;
var trackerCell;

function addRow(trackerTable, se) {
  trackerTable.insertAdjacentHTML('beforeend',
    '<tr><td class="fshCenter">' + se[0] + '</td>' +
    '<td class="fshBold fshCenter fshCooldown">' +
    formatDateTime(new Date(se[1] * 1000)) + '</td></tr>');
}

function buildTrackerTable(seAry) {
  var trackerTable = createTable({className: 'fshTTracker'});
  var tBody = createTBody({
    innerHTML: '<tr><td class="header fshCenter">Creature</td>' +
      '<td class="header fshCenter">Last Kill</td></tr>'
  });
  trackerTable.appendChild(tBody);
  seAry.forEach(addRow.bind(null, tBody));
  return trackerTable;
}

function insertNewRow() {
  var newRow = pCC.lastElementChild.insertRow(-1);
  var newCell = newRow.insertCell(-1);
  newCell.colSpan = 3;
  return newCell;
}

function displayTracker(seAry) {
  var trackerTable = buildTrackerTable(seAry);
  trackerCell = insertNewRow();
  trackerCell.appendChild(trackerTable);
}

function gotSeLog() {
  var seAry = Object.keys(oldLog.se).map(function(key) {
    return [key, oldLog.se[key]];
  }).sort(function(a, b) {
    return a[1] - b[1];
  });
  displayTracker(seAry);
}

function killTable() {
  if (!seTrackerEnabled) {
    if (trackerCell) {
      trackerCell.parentNode.remove();
      trackerCell = false;
    }
    disableBackgroundChecks();
  } else {
    doBackgroundCheck().done(gotSeLog);
  }
}

function togglePref(evt) {
  if (evt.target.id === enableSeTracker) {
    seTrackerEnabled = !seTrackerEnabled;
    setValue(enableSeTracker, seTrackerEnabled);
    killTable();
  }
}

export default function superelite() {
  var newCell = insertNewRow();
  newCell.height = 20;
  newCell = insertNewRow();
  newCell.className = 'fshCenter';
  newCell.innerHTML = simpleCheckboxHtml(enableSeTracker);
  newCell.addEventListener('change', togglePref);
  seTrackerEnabled = getValue(enableSeTracker);
  if (seTrackerEnabled) {
    getSeLog().done(gotSeLog);
  }
}
