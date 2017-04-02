import * as dataObj from './support/dataObj';
import * as layout from './support/layout';
import * as system from './support/system';

var param;

function itemRow(item) {
  var result = '';
  for (var j = 0; j < param.fields.length; j += 1) {
    result += '<td class="fshCenter">';
    var itemField = item[param.fields[j]];
    if (param.fields[j] === param.categoryField) {continue;}
    if (param.tags[j] === 'checkbox') {
      var checked = '';
      if (itemField) {checked = 'checked';}
      result += '<input type="checkbox" ' + checked + ' disabled>';
    } else if (param.url && param.url[j] !== '') {
      result += '<a href="' + param.url[j].replace('@replaceme@', itemField) +
        '">' + itemField + '</a>';
    } else {
      result += itemField;
    }
    result += '</td>';
  }
  return result;
}

function generateManageTable() { // Legacy
  var i;
  var result = '<table cellspacing="2" cellpadding="2" class="fshGc" ' +
    'width="100%"><tr class="fshOr">';
  result += param.headers.reduce(function(prev, curr) {
    return prev + '<th>' + curr + '</th>';
  }, '');
  result += '<th>Action</th></tr>';
  var currentCategory = '';
  for (i = 0; i < param.currentItems.length; i += 1) {
    var item = param.currentItems[i];
    result += '<tr>';
    if (param.categoryField &&
        currentCategory !==
        item[param.categoryField]) {
      currentCategory = item[param.categoryField];
      result += '<td><span class="fshQs">' +
        currentCategory + '</span></td><td></td><td></td><td></td><td></td>' +
          '</tr><tr>';
    }
    result += itemRow(item);
    result += '<td><span class="HelperTextLink" data-itemId="' + i +
      '" id="fshDel' + i + '">[Del]</span></td></tr>';
  }
  result += '<tr>';
  for (i = 0; i < param.tags.length; i += 1) {
    result += '<td align=center><input type="' + param.tags[i] +
      '" class="custominput" id="fshIn' + param.fields[i] + '"></td>';
  }
  result += '<td><span class="HelperTextLink" id="fshAdd">' +
    '[Add]</span></td></tr></table>' +
    '<table width="100%"><tr><td class="fshCenter">' +
    '<textarea cols=70 rows=20 name="fshEd">' +
    JSON.stringify(param.currentItems) + '</textarea></td></tr>' +
    '<tr><td class="fshCenter"><input id="fshSave" ' +
    'type="button" value="Save" class="custombutton">' +
    '&nbsp;<input id="fshReset" type="button" value="Reset" ' +
    'class="custombutton"></td></tr>' +
    '</tbody></table>';
  document.getElementById(param.id).innerHTML = result;
  system.setValueJSON(param.gmname, param.currentItems);
}

function deleteQuickItem(evt) { // Legacy
  var itemId = evt.target.getAttribute('data-itemId');
  param.currentItems.splice(itemId, 1);
  generateManageTable();
}

function addQuickItem() { // Legacy
  var isArrayOnly = param.fields.length === 0;
  var newItem = {};
  if (isArrayOnly) {
    newItem = document.getElementById('fshIn0').value;
  } else {
    for (var i = 0; i < param.fields.length; i += 1) {
      if (param.tags[i] === 'checkbox') {
        newItem[param.fields[i]] =
          document.getElementById('fshIn' +
            param.fields[i]).checked;
      } else {
        newItem[param.fields[i]] =
          document.getElementById('fshIn' +
            param.fields[i]).value;
      }
    }
  }
  param.currentItems.push(newItem);
  generateManageTable();
}

function saveRawEditor() { // jQuery
  param.currentItems =
    JSON.parse($('textarea[name="fshEd"]').val());
  generateManageTable();
}

function resetRawEditor() { // Legacy
  if (location.search === '?cmd=notepad&blank=1&subcmd=auctionsearch') {
    param.currentItems =
      JSON.parse(dataObj.defaults.quickSearchList);
  } else {param.currentItems = [];}
  generateManageTable();
}

function listEvtHnl(e) { // Native
  if (e.target.id === 'fshReset') {resetRawEditor();} else
  if (e.target.id === 'fshSave') {saveRawEditor();} else
  if (e.target.id === 'fshAdd') {addQuickItem();} else
  if (e.target.id.indexOf('fshDel') === 0) {deleteQuickItem(e);}
}

export function injectAuctionSearch(injector) { // Legacy
  var content = injector || layout.pCC;
  content.innerHTML =
    layout.makePageHeader('Trade Hub Quick Search', '', '', '') +
    '<div>This screen allows you to set up some quick ' +
      'search templates for the Auction House. The Display on AH column ' +
      'indicates if the quick search will show on the short list on the ' +
      'Auction House main screen. A maximum of 36 items can show on this ' +
      'list (It will not show more than 36 even if you have more than 36 ' +
      'flagged). To edit items, either use the large text area below, or ' +
      'add a new entry and delete the old one. You can always reset the ' +
      'list to the default values.</div>' +
    '<div class="fshSmall" id="fshAso">' +
    '</div>';
  // global parameters for the meta function generateManageTable
  param = {
    id: 'fshAso',
    headers: ['Category', 'Nickname', 'Quick Search Text',
      'Display in AH?'],
    fields: ['category', 'nickname', 'searchname', 'displayOnAH'],
    tags: ['text', 'text', 'text', 'checkbox'],
    url: ['', '',
      'index.php?cmd=auctionhouse&amp;type=-1&amp;search_text=@replaceme@', ''],
    currentItems: system.getValueJSON('quickSearchList'),
    gmname: 'quickSearchList',
    categoryField: 'category',
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}

export function injectQuickLinkManager(injector) { // Legacy
  var content = injector || layout.pCC;
  content.innerHTML =
    layout.makePageTemplate('Quick Links', '', '', '', 'qla');

  // global parameters for the meta function generateManageTable
  param = {
    id: 'qla',
    headers: ['Name', 'URL',
      'New [<span class="fshLink tip-static" ' +
      'data-tipped="Open page in a new window">?</span>]'],
    fields: ['name', 'url', 'newWindow'],
    tags: ['text', 'text', 'checkbox'],
    currentItems: system.getValueJSON('quickLinks'),
    gmname: 'quickLinks',
  };
  generateManageTable();
  content.addEventListener('click', listEvtHnl);
}
