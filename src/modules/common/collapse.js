import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import setValue from '../system/setValue';

var warehouse = [];
var prefValue;
var headerIndex;

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
  if (el.rowIndex % headerIndex === 0) {return el;}
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
  var articleNo = myRow.rowIndex / headerIndex;
  var article = warehouse[articleNo];
  if (article.open === false) {
    collapseAll();
    expandArt(article);
  } else {
    collapseArt(article);
  }
}

function evtHdl(evt) {
  if (prefValue) {evtEnabled(evt);}
}

function makeHeaderClickable(row) {
  if (prefValue) {row.classList.add('fshPoint');}
}

function collapseDuringAnalysis(row, thisArticle) {
  if (prefValue) {
    row.classList.add('fshHide');
    thisArticle.open = false;
  } else {
    thisArticle.open = true;
  }
}

function hasExtraFn(extraFn, row) {
  if (typeof extraFn === 'function') {extraFn(row);}
}

function testRowType(row, rowType, thisArticle, articleTest, extraFn) {
  if (rowType === 0) {
    thisArticle.header = row;
    makeHeaderClickable(row);
    hasExtraFn(extraFn, row);
  }
  if (articleTest(rowType)) {
    thisArticle.rows[rowType] =
      fallback(thisArticle[rowType], {});
    thisArticle.rows[rowType].row = row;
    collapseDuringAnalysis(row, thisArticle);
  }
}

function doTagging(articleTest, extraFn, row) {
  var rowType = row.rowIndex % headerIndex;
  var articleNo = (row.rowIndex - rowType) / headerIndex;
  warehouse[articleNo] = fallback(warehouse[articleNo], {});
  var thisArticle = warehouse[articleNo];
  thisArticle.rows = thisArticle.rows || [];
  testRowType(row, rowType, thisArticle, articleTest, extraFn);
}

function toggleHeaderClass() {
  warehouse.forEach(function(article) {
    article.header.classList.toggle('fshPoint');
  });
}

function togglePref(prefName) {
  prefValue = !prefValue;
  setValue(prefName, prefValue);
  if (prefValue) {collapseAll();} else {expandAll();}
  toggleHeaderClass();
}

function setupPref(prefName) {
  var prefEl = getElementById(prefName);
  prefValue = prefEl.checked;
  getElementById(prefName)
    .addEventListener('change', togglePref.bind(null, prefName));
}

export default function collapse(param) {
  headerIndex = param.headInd;
  setupPref(param.prefName);
  Array.prototype.forEach.call(param.theTable.rows,
    doTagging.bind(null, param.articleTest, param.extraFn));
  param.theTable.addEventListener('click', evtHdl);
}
