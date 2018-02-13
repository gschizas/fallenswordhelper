import calf from '../support/calf';
import formatUtcDateTime from '../common/formatUtcDateTime';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {pCC} from '../support/layout';
import setValue from '../system/setValue';
import {simpleCheckboxHtml} from '../settings/simpleCheckbox';
import {createTBody, createTable} from '../common/cElement';
import {
  disableBackgroundChecks,
  doBackgroundCheck,
  getFshSeLog,
  oldLog
} from './seLog';

var enableSeTracker = 'enableSeTracker';
var trackerCell;

function addRow(trackerTable, se) {
  trackerTable.insertAdjacentHTML('beforeend',
    '<tr><td class="fshCenter">' + se[0] + '</td>' +
    '<td class="fshBold fshCenter fshCooldown">' +
    formatUtcDateTime(new Date(se[1] * 1000)) + '</td></tr>');
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
  if (oldLog && oldLog.se) {
    var seAry = Object.keys(oldLog.se).map(function(key) {
      return [key, oldLog.se[key]];
    }).sort(function(a, b) {
      return a[1] - b[1];
    });
    displayTracker(seAry);
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
    doBackgroundCheck().always(gotSeLog);
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
  doBackgroundCheck().always(gotSeLog);
}

export default function superelite() {
  if (jQueryNotPresent) {return;}
  var newCell = insertNewRow();
  newCell.height = 20;
  newCell = insertNewRow();
  newCell.className = 'fshCenter';
  newCell.innerHTML = simpleCheckboxHtml(enableSeTracker);
  newCell.addEventListener('change', togglePref);
  if (calf.enableSeTracker) {
    getFshSeLog().done(waitForLog);
  }
}
