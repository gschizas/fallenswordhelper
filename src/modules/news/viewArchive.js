import {pCC} from '../support/layout';
import {simpleCheckbox} from '../settings/settingsPage';
import {
  fallback,
  getValue,
  parseDateAsTimestamp,
  setValue
} from '../support/system';

var warehouse = [];
var collapseNewsArchive;
var lastLadderReset;

function collapseArt(article) {
  article.rows.forEach(function(el) {
    el.row.classList.add('fshHide');
  });
  article.open = false;
}

function collapseAll() {
  warehouse.forEach(function(article) {
    if (article.open) {collapseArt(article);}
  });
}

function expandArt(article) {
  article.rows.forEach(function(el) {
    el.row.classList.remove('fshHide');
  });
  article.open = true;
}

function expandAll() {
  warehouse.forEach(function(article) {
    if (!article.open) {expandArt(article);}
  });
}

function isHeader(el) {
  if (el.rowIndex % 6 === 0) {return el;}
}

function closestTr(el) {
  if (el.tagName === 'TR') {
    return isHeader(el);
  }
  if (el.tagName === 'TABLE') {return;}
  return closestTr(el.parentNode);
}

function evtEnabled(evt) {
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

function evtHdl(evt) {
  if (collapseNewsArchive) {evtEnabled(evt);}
}

function makeHeaderClickable(row) {
  if (collapseNewsArchive) {row.classList.add('fshPoint');}
}

function collapseDuringAnalysis(row, thisArticle) {
  if (collapseNewsArchive) {
    row.classList.add('fshHide');
    thisArticle.open = false;
  } else {
    thisArticle.open = true;
  }
}

function checkForPvPLadder(row) {
  if (row.children[1].children[0].textContent === 'PvP Ladder') {
    var logTime = parseDateAsTimestamp(
      row.children[1].children[2].textContent.replace('Posted: ', ''));
    if (logTime > lastLadderReset) {
      setValue('lastLadderReset', logTime);
      lastLadderReset = logTime;
    }
  }
}

function testRowType(row, rowType, thisArticle) {
  if (rowType === 0) {
    thisArticle.header = row;
    makeHeaderClickable(row);
    checkForPvPLadder(row);
  }
  if (rowType > 1) {
    thisArticle.rows[rowType] =
      fallback(thisArticle[rowType], {});
    thisArticle.rows[rowType].row = row;
    collapseDuringAnalysis(row, thisArticle);
  }
}

function doTagging(row) {
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = fallback(warehouse[articleNo], {});
  var thisArticle = warehouse[articleNo];
  thisArticle.rows = thisArticle.rows || [];
  testRowType(row, rowType, thisArticle);
}

function toggleHeaderClass() {
  warehouse.forEach(function(article) {
    article.header.classList.toggle('fshPoint');
  });
}

function togglePref() {
  collapseNewsArchive = !collapseNewsArchive;
  setValue('collapseNewsArchive', collapseNewsArchive);
  if (collapseNewsArchive) {collapseAll();} else {expandAll();}
  toggleHeaderClass();
}

function setupPref(rowInjector) {
  collapseNewsArchive = getValue('collapseNewsArchive');
  rowInjector.insertAdjacentHTML('afterend',
    simpleCheckbox('collapseNewsArchive'));
  document.getElementById('collapseNewsArchive')
    .addEventListener('click', togglePref);
}

export default function viewArchive() {
  lastLadderReset = getValue('lastLadderReset');
  var theTables = pCC.getElementsByTagName('table');
  setupPref(theTables[0].rows[2]);
  Array.prototype.forEach.call(theTables[2].rows, doTagging);
  theTables[2].addEventListener('click', evtHdl);
}
