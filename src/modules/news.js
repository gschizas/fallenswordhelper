import * as layout from './support/layout';
import * as settingsPage from './settings/settingsPage';
import * as system from './support/system';

var maxcharacters;
var textArea;
var shoutboxPreview;
var warehouse = [];
var collapseNewsArchive;

function updateShoutboxPreview() { // Native
  var textContent = textArea.value;
  var chars = textContent.length;
  if (chars > maxcharacters) {
    textContent = textContent.substring(0, maxcharacters);
    textArea.value = textContent;
    chars = maxcharacters;
  }
  if (!shoutboxPreview) {
    shoutboxPreview = textArea.parentNode.parentNode.parentNode.parentNode
      .insertRow().insertCell();
  }
  shoutboxPreview.innerHTML = '<table class="sbpTbl"><tbody><tr>' +
    '<td class="sbpHdr">Preview (' + chars + '/' + maxcharacters +
    ' characters)</td></tr><tr><td class="sbpMsg"><span>' + textContent +
    '</span></td></tr></tbody></table>';
}

function injectShoutboxWidgets() { // Native
  textArea = document.getElementById('textInputBox');
  textArea.classList.add('fshNoResize');
  textArea.addEventListener('keyup', updateShoutboxPreview);
}

export function newsFsbox() { // Native
  maxcharacters = 100;
  injectShoutboxWidgets();
}

export function newsShoutbox() { // Native
  maxcharacters = 150;
  injectShoutboxWidgets();
}

function closestHead(el) { // Native
  if (el.classList.contains('news_head') ||
      el.classList.contains('news_head_tavern')) {
    return el;
  }
  if (el.classList.contains('news_left_column')) {return;}
  return closestHead(el.parentNode);
}

function newsEvt(evt) { // jQuery
  var newsHead = closestHead(evt.target);
  if (!newsHead) {return;}
  var newsBody = newsHead.nextElementSibling;
  var _class = newsHead.classList.contains('news_head_tavern') ?
    '.news_body_tavern' : '.news_body';
  if (!$(newsBody).data('open')) {
    evt.preventDefault();
    $(_class).hide().data('open', false);
    $(newsBody).show().data('open', true);
  } else if (evt.target.tagName !== 'A') {
    $(newsBody).hide().data('open', false);
  }
  evt.stopPropagation();
}

function fixCollapse() { // Native
  var newsCol = document.getElementsByClassName('news_left_column');
  if (newsCol.length !== 1) {return;}
  newsCol[0].addEventListener('click', newsEvt, true);
}

export function injectHomePageTwoLink() { // Native
  var archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewupdatearchive"]');
  if (!archiveLink) {return;}
  archiveLink.insertAdjacentHTML('afterend', '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewupdatearchive&subcmd2=&page=2&search_text=">' +
    'View Updates Page 2</a>');
  archiveLink = document.querySelector(
    '#pCC a[href="index.php?cmd=&subcmd=viewarchive"]');
  archiveLink.insertAdjacentHTML('afterend', '&nbsp;<a href="index.php?cmd=' +
    '&subcmd=viewarchive&subcmd2=&page=2&search_text=">View News Page 2</a>');
  fixCollapse();
}

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

function closestTr(el) { // Native
  if (el.tagName === 'TR') {
    if (el.rowIndex % 6 === 0) {return el;}
    return;
  }
  if (el.tagName === 'TABLE') {return;}
  return closestTr(el.parentNode);
}

function evtHdl(evt) { // Native
  if (!collapseNewsArchive) {return;}
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

function doTagging(row) { // Native
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = system.newMember(warehouse[articleNo]);
  var thisArticle = warehouse[articleNo];
  thisArticle.rows = thisArticle.rows || [];
  if (rowType === 0) {
    thisArticle.header = row;
    if (collapseNewsArchive) {
      row.classList.add('fshPoint');
    }
  } // TODO toggle this
  if (rowType > 1) {
    thisArticle.rows[rowType] =
      system.newMember(thisArticle[rowType]);
    thisArticle.rows[rowType].row = row;
    if (collapseNewsArchive) {
      thisArticle.open = false;
      row.classList.add('fshHide');
    } else {
      thisArticle.open = true;
    }
  }
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

export function viewArchive() { // Native
  var theTables = layout.pCC.getElementsByTagName('table');
  setupPref(theTables[0].rows[2]);
  Array.prototype.forEach.call(theTables[2].rows, doTagging);
  theTables[2].addEventListener('click', evtHdl);
}
