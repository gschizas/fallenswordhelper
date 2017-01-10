import system from './support/system';

function updateShoutboxPreview() { // Legacy
  var textArea =
    system.findNode('//textarea[@findme="Helper:InputText"]');
  var textContent = textArea.value;
  var chars = textContent.length;
  var maxchars = parseInt(textArea.getAttribute('maxcharacters'),10);
  if (chars>maxchars) {
    textContent=textContent.substring(0,maxchars);
    textArea.value=textContent;
    chars=maxchars;
  }

  document.getElementById('Helper:ShoutboxPreview').innerHTML =
    '<table align="center" width="325" border="0"><tbody>' +
    '<tr><td style="text-align:center;color:#7D2252;' +
    'background-color:#CD9E4B">Preview (' + chars + '/' + maxchars +
    ' characters)</td></tr>' +
    '<tr><td width="325"><span style="font-size:x-small;" ' +
    'findme="biopreview">' + textContent +
    '</span></td></tr></tbody></table>';

}

function injectShoutboxWidgets(textboxname, maxcharacters) { // Legacy
  var textArea =
    system.findNode('//textarea[@name="' + textboxname + '"]');
  textArea.setAttribute('findme', 'Helper:InputText');
  textArea.setAttribute('maxcharacters', maxcharacters);
  var textAreaTable = system.findNode('../../../..', textArea);
  textAreaTable.insertRow(-1).insertCell(0)
    .setAttribute('id', 'Helper:ShoutboxPreview');
  textArea.addEventListener('keyup', updateShoutboxPreview, true);
}

function newsFsbox() { // Native
  injectShoutboxWidgets('fsbox_input', 100);
}

function newsShoutbox() { // Native
  injectShoutboxWidgets('shoutbox_input', 150);
}

//#if _DEV
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
  } else {
    if (evt.target.tagName !== 'A') {
      $(newsBody).hide().data('open', false);
    }
  }
  evt.stopPropagation();
}

function fixCollapse() { // Native
  var newsCol = document.getElementsByClassName('news_left_column');
  if (newsCol.length !== 1) {return;}
  newsCol[0].addEventListener('click', newsEvt, true);
}
//#endif
function injectHomePageTwoLink() { // Native
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
//#if _DEV
  fixCollapse();
//#endif
}

//#if _DEV
var warehouse = [];

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
  collapseAll();
  article.rows.forEach(function(el) {el.row.classList.remove('fshHide');});
  article.open = true;
}

function closestTr(el) { // Native
  if (el.tagName === 'TR') {
    if (el.rowIndex % 6 === 0) {return el;} else {return;}
  }
  if (el.tagName === 'TABLE') {return;}
  return closestTr(el.parentNode);
}

function evtHdl(evt) { // Native
  var myRow = closestTr(evt.target);
  if (!myRow) {return;}
  var articleNo = myRow.rowIndex / 6;
  var article = warehouse[articleNo];
  if (article.open === false) {
    expandArt(article);
  } else {
    collapseArt(article);
  }
}

function doTagging(row) { // Native
  var rowType = row.rowIndex % 6;
  var articleNo = (row.rowIndex - rowType) / 6;
  warehouse[articleNo] = warehouse[articleNo] || {};
  warehouse[articleNo].open = false;
  warehouse[articleNo].rows = warehouse[articleNo].rows || [];
  if (rowType === 0) {row.classList.add('buffLink');}
  if (rowType > 1) {
    warehouse[articleNo].rows[rowType] = warehouse[articleNo][rowType] || {};
    warehouse[articleNo].rows[rowType].row = row;
    row.classList.add('fshHide');
  }
}

function viewArchive() { // Native
  var myTable = document.getElementById('pCC').getElementsByTagName('table')[2];
  Array.prototype.forEach.call(myTable.rows, doTagging);
  myTable.addEventListener('click', evtHdl);
}
//#endif
export default {
  newsFsbox: newsFsbox,
  newsShoutbox: newsShoutbox,
  injectHomePageTwoLink: injectHomePageTwoLink,
  //#if _DEV
  viewArchive: viewArchive,
  //#endif
};
