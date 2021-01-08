import createTBody from '../../common/cElement/createTBody';
import createTable from '../../common/cElement/createTable';
import entries from '../../common/entries';
import insertElement from '../../common/insertElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import { now } from '../../support/now';
import {
  coolTime, cooldownText, seen, titan,
} from './constants';

function reformat(el) {
  return [el[0], el[1].cooldownText, el[1].coolTime, el[1].seen];
}

function onCd(el) { return el[coolTime] > now; }

function int(a, b) { return a[coolTime] - b[coolTime]; }

function makeRow(el) {
  return `<tr><td class="fshCenter">${el[titan]
  }</td><td class="fshBold fshCenter fshCooldown">${el[cooldownText]
  }</td><td class="fshCenter">${el[seen]}</td></tr>`;
}

function makeHtml(theTitans) {
  return entries(theTitans).map(reformat).filter(onCd).sort(int)
    .map(makeRow)
    .join('');
}

function makeTrackerTable(theTitans) {
  const trackerTable = createTable({ className: 'fshTTracker' });
  const tBody = createTBody({
    innerHTML: '<tr><td class="header fshCenter">Titan</td>'
      + '<td class="header fshCenter">Cooldown</td>'
      + '<td class="header fshCenter">Visible</td></tr>',
  });
  insertElement(trackerTable, tBody);
  insertHtmlBeforeEnd(tBody, makeHtml(theTitans));
  return trackerTable;
}

export default function displayTracker(parentTable, theTitans) {
  if (parentTable.rows.length > 5) {
    const trackerTable = makeTrackerTable(theTitans);
    const newRow = parentTable.insertRow(5);
    const newCell = newRow.insertCell(-1);
    newCell.colSpan = 3;
    insertElement(newCell, trackerTable);
  }
}
