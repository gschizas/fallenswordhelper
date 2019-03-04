import conflicts from '../ajax/conflicts';
import createDocument from '../system/createDocument';
import {guildSubcmdUrl} from '../support/constants';
import myRows from '../common/myRows';
import partial from '../common/partial';
import querySelector from '../common/querySelector';

function makeCell(newRow, html) {
  newRow.insertCell(-1).innerHTML = html;
}

function buildRow(insertHere, html1, html2) {
  var newRow = insertHere.insertRow(insertHere.rows.length - 2);
  makeCell(newRow, html1);
  makeCell(newRow, html2);
}

function conflictHeader(insertHere) {
  buildRow(insertHere, '<a href="' + guildSubcmdUrl +
    'conflicts">Active Conflicts</a>', 'Score');
}

function conflictRow(insertHere, aRow) {
  buildRow(insertHere,
    aRow.cells[0].innerHTML, '<b>' + aRow.cells[6].innerHTML + '</b>');
}

function hazConflict(conflictTable, curPage, insertHere) { // Legacy
  if (curPage === 1) {
    conflictHeader(insertHere);
  }
  Array.from(conflictTable.rows).filter(myRows(7, 0))
    .forEach(partial(conflictRow, insertHere));
}

function activeConflicts(doc, curPage, insertHere) { // Legacy
  var conflictTable = querySelector(
    '#pCC > table > tbody > tr > td > table', doc);
  if (conflictTable && conflictTable.rows.length > 3) {
    hazConflict(conflictTable, curPage, insertHere);
  }
}

function getMaxPage(page) {
  return Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
}

function getNextPage(curPage, fn, callback) {
  conflicts(curPage + 1).then(partial(fn, callback));
}

function gotConflictInfo(callback, responseText) { // Legacy
  var doc = createDocument(responseText);
  var page = querySelector('#pCC input[name="page"]', doc);
  if (!page) {return;}
  var curPage = Number(page.value);
  var maxPage = getMaxPage(page);
  activeConflicts(doc, curPage, callback.node);
  if (maxPage > curPage) {
    getNextPage(curPage, gotConflictInfo, callback);
  }
}

export default function conflictInfo(leftHandSideColumnTable) { // jQuery.min
  var statCtrl = leftHandSideColumnTable.rows[6].cells[0].children[0];
  if (statCtrl) {
    conflicts(1).then(partial(gotConflictInfo, {node: statCtrl}));
  }
}
