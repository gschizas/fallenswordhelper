import createDocument from '../system/createDocument';
import partial from '../common/partial';
import retryAjax from '../ajax/retryAjax';

var conflictUrl = 'index.php?cmd=guild&subcmd=conflicts';
var ajaxUrl = conflictUrl + '&no_mobile=1';

function hazConflict(conflictTable, curPage, insertHere) { // Legacy
  if (curPage === 1) {
    var newNode = insertHere.insertRow(insertHere.rows.length - 2);
    newNode.insertCell(0);
    newNode.insertCell(0);
    newNode.cells[0].innerHTML =
      '<a href="' + conflictUrl + '">Active Conflicts</a>';
    newNode.cells[1].innerHTML = 'Score';
  }
  for (var i = 1; i <= conflictTable.rows.length - 4; i += 2) {
    var newRow = insertHere.insertRow(insertHere.rows.length - 2);
    newRow.insertCell(0);
    newRow.insertCell(0);
    newRow.cells[0].innerHTML = conflictTable.rows[i].cells[0].innerHTML;
    newRow.cells[1].innerHTML = '<b>' + conflictTable.rows[i].cells[6]
      .innerHTML + '</b>';
  }
}

function activeConflicts(doc, curPage, insertHere) { // Legacy
  var conflictTable = doc.querySelector(
    '#pCC > table > tbody > tr > td > table');
  if (conflictTable && conflictTable.rows.length > 3) {
    hazConflict(conflictTable, curPage, insertHere);
  }
}

function getMaxPage(page) {
  return Number(page.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1]);
}

function getNextPage(curPage, fn, callback) {
  retryAjax(ajaxUrl + 'page=' + (curPage + 1).toString())
    .done(partial(fn, callback));
}

function gotConflictInfo(callback, responseText) { // Legacy
  var doc = createDocument(responseText);
  var page = doc.querySelector('#pCC input[name="page"]');
  if (!page) {return;}
  var curPage = Number(page.value);
  var maxPage = getMaxPage(page);
  activeConflicts(doc, curPage, callback.node);
  if (maxPage > curPage) {
    getNextPage(curPage, gotConflictInfo, callback);
  }
}

export default function conflictInfo(leftHandSideColumnTable) { // jQuery.min
  var statCtrl = leftHandSideColumnTable.rows[6].cells[0]
    .firstChild.nextSibling;
  if (statCtrl) {
    retryAjax(ajaxUrl).done(partial(gotConflictInfo, {node: statCtrl}));
  }
}
