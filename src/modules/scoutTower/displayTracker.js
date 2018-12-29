import insertElement from '../common/insertElement';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import {now} from '../support/constants';
import partial from '../common/partial';
import {createTBody, createTable} from '../common/cElement';

function addRow(theTitans, trackerTable, titan) {
  if (theTitans[titan].coolTime < now) {return;}
  insertHtmlBeforeEnd(trackerTable,
    '<tr><td class="fshCenter">' + titan + '</td>' +
    '<td class="fshBold fshCenter fshCooldown">' +
    theTitans[titan].cooldownText + '</td><td class="fshCenter">' +
    theTitans[titan].seen + '</td></tr>');
}

function makeTrackerTable(theTitans) {
  var trackerTable = createTable({className: 'fshTTracker'});
  var tBody = createTBody({
    innerHTML: '<tr><td class="header fshCenter">Titan</td>' +
      '<td class="header fshCenter">Cooldown</td>' +
      '<td class="header fshCenter">Visible</td></tr>'
  });
  insertElement(trackerTable, tBody);
  Object.keys(theTitans).forEach(partial(addRow, theTitans, tBody));
  return trackerTable;
}

export default function displayTracker(parentTable, theTitans) {
  var trackerTable = makeTrackerTable(theTitans);
  var newRow = parentTable.insertRow(5);
  var newCell = newRow.insertCell(-1);
  newCell.colSpan = 3;
  insertElement(newCell, trackerTable);
}
