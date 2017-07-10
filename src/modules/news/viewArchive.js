import * as layout from '../support/layout';
import * as settingsPage from '../settings/settingsPage';
import * as system from '../support/system';

var warehouse = [];
var collapseNewsArchive;
var lastLadderReset;

function collapseArt(article) { // Native
  article.rows.forEach(function(el) {
    el.row.classList.add('fshHide');
  });
  article.open = false;
}

function collapseAll() { // Native
  warehouse.forEach(function(article) {
    if (article.open) {collapseArt(article);}
  });
}

function expandArt(article) { // Native
  article.rows.forEach(function(el) {
    el.row.classList.remove('fshHide');
  });
  article.open = true;
}

function expandAll() { // Native
  warehouse.forEach(function(article) {
    if (!article.open) {expandArt(article);}
  });
}

function isHeader(el) { // Native
  if (el.rowIndex % 6 === 0) {return el;}
}

function closestTr(el) { // Native
  if (el.tagName === 'TR') {
    return isHeader(el);
  }
  if (el.tagName === 'TABLE') {return;}
  return closestTr(el.parentNode);
}

function evtEnabled(evt) { // Native
  var myRow = closestTr(evt.target);
  if (!myRow) {return;}
  var articleNo = myRow.rowIndex / 6;
  var article = warehouse[articleNo];
  if (article.open === false) {
    collapseAll();
    expandArt(article);
  } else {
    collapseArt(article);
  }
}

function evtHdl(evt) { // Native
  if (collapseNewsArchive) {evtEnabled(evt);}
}

function makeHeaderClickable(row) { // Native
  if (collapseNewsArchive) {row.classList.add('fshPoint');}
}

function collapseDuringAnalysis(row, thisArticle) { // Native
  if (collapseNewsArchive) {
    row.classList.add('fshHide');
    thisArticle.open = false;
  } else {
    thisArticle.open = true;
  }
}

function checkForPvPLadder(row) { // Native
  if (row.children[1].children[0].textContent === 'PvP Ladder') {
    var logTime = system.parseDateAsTimestamp(
      row.children[1].children[2].textContent.replace('Posted: ', ''));
    if (logTime > lastLadderReset) {
      system.setValue('lastLadderReset', logTime);
      lastLadderReset = logTime;
    }
  }
}

function testRowType(row, rowType, thisArticle) { // Native
  if (rowType === 0) {
    thisArticle.header = row;
    makeHeaderClickable(row);
    checkForPvPLadder(row);
  }
  if (rowType > 1) {
    thisArticle.rows[rowType] =
      system.fallback(thisArticle[rowType], {});
    thisArticle.rows[rowType].row = row;
    collapseDuringAnalysis(row, thisArticle);
  }
}

function doTagging(row) { // Native
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = system.fallback(warehouse[articleNo], {});
  var thisArticle = warehouse[articleNo];
  thisArticle.rows = thisArticle.rows || [];
  testRowType(row, rowType, thisArticle);
}

function toggleHeaderClass() {
  warehouse.forEach(function(article) {
    article.header.classList.toggle('fshPoint');
  });
}

function togglePref() { // Native
  collapseNewsArchive = !collapseNewsArchive;
  system.setValue('collapseNewsArchive', collapseNewsArchive);
  if (collapseNewsArchive) {collapseAll();} else {expandAll();}
  toggleHeaderClass();
}

function setupPref(rowInjector) {
  collapseNewsArchive = system.getValue('collapseNewsArchive');
  rowInjector.insertAdjacentHTML('afterend',
    settingsPage.simpleCheckbox('collapseNewsArchive'));
  document.getElementById('collapseNewsArchive')
    .addEventListener('click', togglePref);
}

export default function viewArchive() { // Native
  lastLadderReset = system.getValue('lastLadderReset');
  var theTables = layout.pCC.getElementsByTagName('table');
  setupPref(theTables[0].rows[2]);
  Array.prototype.forEach.call(theTables[2].rows, doTagging);
  theTables[2].addEventListener('click', evtHdl);
}
