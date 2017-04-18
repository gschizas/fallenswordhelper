import calf from './support/calf';
import * as ajax from './support/ajax';
import * as debug from './support/debug';
import * as system from './support/system';
import * as task from './support/task';

function getItemDiv() { // Native
  var itemDiv = document.getElementById('item-div');
  if (!itemDiv) {
    itemDiv = document.createElement('div');
    itemDiv.id = 'item-div';
    itemDiv.className = 'itemDiv';
    var itemList = document.getElementById('item-list');
    var oldItems = itemList.getElementsByTagName('table');
    while (oldItems.length) {
      oldItems[0].classList.add('fshBlock');
      itemDiv.appendChild(oldItems[0]);
    }
    itemList.parentNode.insertBefore(itemDiv, itemList);
  }
  return itemDiv;
}

function doHideFolder(evt) { // Native
  var folderid = evt.target.id;
  var itemDiv = getItemDiv();
  var items = itemDiv.getElementsByTagName('table');
  Array.prototype.forEach.call(items, function(el) {
    el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild.checked = false;
    var hidden = el.classList.contains('fshHide');
    var all = folderid === 'folderid0';
    var hasFolder = el.classList.contains(folderid);
    if (hidden && (all || hasFolder)) {
      el.classList.remove('fshHide');
      el.classList.add('fshBlock'); // show()
    }
    if (!hidden && !all && !hasFolder) {
      el.classList.remove('fshBlock');
      el.classList.add('fshHide'); // hide()
    }
  });
}

function hideFolder(evt) { // native
  if (evt.target.nodeName === 'SPAN' &&
      evt.target.id.indexOf('folderid') !== -1) {doHideFolder(evt);}
}

function doFolderHeaders(folders) { // native
  var foldersRow = document.createElement('tr');
  foldersRow.id = 'fshFolderSelect';
  var folderCell = '<td colspan=6>';
  // append main folder
  folderCell += '<span id="folderid0" class="fshLink" fid=0>All</span>' +
    ' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>';
  Object.keys(folders).forEach(function(key) {
    folderCell += ' &ensp;<span id="folderid' + key +
      '" class="fshLink fshNoWrap" fid=' + key + '>' +
      folders[key] + '</span> ';
  });
  foldersRow.insertAdjacentHTML('afterbegin', folderCell);
  foldersRow.addEventListener('click', hideFolder);
  var multiple = document.getElementById('fshSelectMultiple');
  multiple.insertAdjacentHTML('afterend', '<tr id="fshShowSTs">' +
    '<td align="center" colspan=6>' +
    '<label><input type="checkbox" id="itemsInSt" checked> ' +
    'Select items in ST</label></td></tr>');
  multiple.insertAdjacentElement('afterend', foldersRow);
}

var invItems;

function forEachInvItem(el) {
  var checkbox = el.firstElementChild.lastElementChild.firstElementChild
    .firstElementChild;
  var item = invItems[checkbox.getAttribute('value')];
  el.classList.add('folderid' + item.folder_id);
  if (invItems.fshHasST) {
    if (item.is_in_st) {
      el.classList.add('isInSTBorder');
    } else {el.classList.add('tradeItemMargin');}
  }
  checkbox.classList.add('itemid' + item.item_id);
  checkbox.classList.add('itemtype' + item.type);
  if (item.is_in_st) {el.classList.add('isInST');}
}

function processTrade(data) { // native

  debug.time('trade.processTrade');

  invItems = data.items;
  /* Highlight items in ST */
  var nodeList = document.getElementById('item-list')
    .getElementsByTagName('table');
  Array.prototype.forEach.call(nodeList, forEachInvItem);
  doFolderHeaders(data.folders);

  debug.timeEnd('trade.processTrade');

}

function inv() { // jQuery
  ajax.getInventoryById().done(function(data) {
    task.add(3, processTrade, [data]);
  });
}

function getHowMany(itemTables) { // Native
  var howMany = parseInt(document.getElementById('fshSendHowMany').value, 10);
  if (isNaN(howMany)) {return itemTables.length;}
  // maximum of 100 items in an ST
  if (calf.subcmd !== '-') {return Math.min(100, howMany);}
  return howMany;
}

function doCheckAll(evt) { // Native
  var itemid = evt.target.id;
  var itemList = document.getElementById('item-div') ||
    document.getElementById('item-list');
  var itemTables = itemList.querySelectorAll('table:not(.fshHide)');
  var howMany = getHowMany(itemTables);
  var itemsInSt = document.getElementById('itemsInSt').checked;
  Array.prototype.forEach.call(itemTables, function(el) {
    var checkbox = el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild;
    if (howMany &&
        system.fallback(itemsInSt, !checkbox.classList.contains('isInST')) &&
        (itemid === 'itemid-1' ||
        itemid === 'itemid-2' &&
        checkbox.classList.contains('itemtype12') ||
        checkbox.classList.contains(itemid))) {
      checkbox.checked = true;
      howMany -= 1;
      return;
    }
    checkbox.checked = false;
  });
}

function toggleAllPlants(evt) { // native
  if (evt.target.classList.contains('fshCheckAll')) {doCheckAll(evt);}
}

function injectTradeOld() { // native
  var multiple = document.createElement('tr');
  multiple.id = 'fshSelectMultiple';
  var myTd = '<td colspan=6>Select:&ensp;<span id="itemid-1" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;' +
    '<span id="itemid-2" ' +
    'class="fshCheckAll fshLink fshNoWrap">All Resources</span>';
  var sendClasses = system.getValue('sendClasses');
  var itemList = JSON.parse('[' + sendClasses + ']');
  itemList.forEach(function(el) {
    myTd += ' &ensp;<span id="itemid' + el[1] +
      '" class="fshCheckAll fshLink fshNoWrap">' + el[0] + '</span>';
  });
  myTd += ' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" ' +
    'class="custominput" value="all" size=3></td>';
  multiple.insertAdjacentHTML('afterbegin', myTd);
  multiple.addEventListener('click', toggleAllPlants);
  var el = document.getElementById('item-list').parentNode.parentNode;
  el.parentNode.insertBefore(multiple, el);
}

export function injectTrade() { // native
  task.add(3, inv);
  task.add(3, injectTradeOld);
}
