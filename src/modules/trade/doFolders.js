import add from '../support/task';
import {fallback} from '../support/system';
import {getElementById} from '../common/getElement';
import getInventoryById from '../ajax/getInventoryById';
import {createDiv, createTr} from '../common/cElement';
import {time, timeEnd} from '../support/debug';

var invItems;

function getItemDiv() {
  var itemDiv = getElementById('item-div');
  if (!itemDiv) {
    itemDiv = createDiv({id: 'item-div', className: 'itemDiv'});
    var itemList = getElementById('item-list');
    var oldItems = itemList.getElementsByTagName('table');
    while (oldItems.length) {
      oldItems[0].classList.add('fshBlock');
      itemDiv.appendChild(oldItems[0]);
    }
    itemList.parentNode.insertBefore(itemDiv, itemList);
  }
  return itemDiv;
}

function shouldShow(hidden, all, hasFolder) {
  return hidden && fallback(all, hasFolder);
}

function shouldHide(hidden, all, hasFolder) {
  return !hidden && !all && !hasFolder;
}

function doHideFolder(evt) {
  var folderid = evt.target.id;
  var itemDiv = getItemDiv();
  var items = itemDiv.getElementsByTagName('table');
  Array.prototype.forEach.call(items, function(el) {
    el.firstElementChild.lastElementChild.firstElementChild
      .firstElementChild.checked = false;
    var hidden = el.classList.contains('fshHide');
    var all = folderid === 'folderid0';
    var hasFolder = el.classList.contains(folderid);
    if (shouldShow(hidden, all, hasFolder)) {
      el.classList.remove('fshHide');
      el.classList.add('fshBlock'); // show()
    }
    if (shouldHide(hidden, all, hasFolder)) {
      el.classList.remove('fshBlock');
      el.classList.add('fshHide'); // hide()
    }
  });
}

function hideFolder(evt) {
  if (evt.target.nodeName === 'SPAN' &&
      evt.target.id.indexOf('folderid') !== -1) {doHideFolder(evt);}
}

function doFolderHeaders(folders) {
  var folderCell = '<td colspan=6>';
  // append main folder
  folderCell += '<span id="folderid0" class="fshLink" fid=0>All</span>' +
    ' &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>';
  Object.keys(folders).forEach(function(key) {
    folderCell += ' &ensp;<span id="folderid' + key +
      '" class="fshLink fshNoWrap" fid=' + key + '>' +
      folders[key] + '</span> ';
  });
  var foldersRow = createTr({
    id: 'fshFolderSelect',
    innerHTML: folderCell
  });
  foldersRow.addEventListener('click', hideFolder);
  var el = getElementById('item-list').parentNode.parentNode;
  el.insertAdjacentHTML('beforebegin', '<tr id="fshShowSTs">' +
    '<td align="center" colspan=6>' +
    '<label><input type="checkbox" id="itemsInSt" checked> ' +
    'Select items in ST</label></td></tr>');
  el.insertAdjacentElement('beforebegin', foldersRow);
}

function stColor(el, item) {
  if (item.is_in_st) {
    el.classList.add('isInST');
  } else {el.classList.add('tradeItemMargin');}
}

function forEachInvItem(el) {
  var checkbox = el.firstElementChild.lastElementChild.firstElementChild
    .firstElementChild;
  var item = invItems[checkbox.getAttribute('value')];
  el.classList.add('folderid' + item.folder_id);
  if (invItems.fshHasST) {stColor(el, item);}
  checkbox.classList.add('itemid' + item.item_id);
  checkbox.classList.add('itemtype' + item.type);
}

function processTrade(data) {

  time('trade.processTrade');

  invItems = data.items;
  /* Highlight items in ST */
  var nodeList = getElementById('item-list')
    .getElementsByTagName('table');
  Array.prototype.forEach.call(nodeList, forEachInvItem);
  doFolderHeaders(data.folders);

  timeEnd('trade.processTrade');

}

export default function doFolders() { // jQuery.min
  getInventoryById().done(function(data) {
    add(3, processTrade, [data]);
  });
}
