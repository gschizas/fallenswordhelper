import add from '../support/task';
import calf from '../support/calf';
import getInventoryById from '../ajax/getInventoryById';
import hideElement from '../common/hideElement';
import insertElement from '../common/insertElement';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryPresent from '../common/jQueryPresent';
import makeFolderSpans from '../common/makeFolderSpans';
import on from '../common/on';
import {pCC} from '../support/layout';
import toggleForce from '../common/toggleForce';
import {createDiv, createInput, createLabel} from '../common/cElement';
import {def_table, itemRE} from '../support/constants';

var itemTable;
var itemsAry;
var invItems;
var folderId = 0;
var perfBox;

function whichTableHasItems() {
  var allTables = pCC.lastElementChild.getElementsByTagName(def_table);
  if (calf.cmd === 'crafting') {
    return allTables[1];
  }
  return allTables[0];
}

function drawingNewItemTable() {
  if (!drawingNewItemTable.itemGrid) {
    drawingNewItemTable.itemGrid = createDiv({className: 'fshItemGrid'});
    itemsAry.forEach(function(item) {
      var itemDiv = createDiv();
      var aLink = item[0].parentNode;
      insertElement(itemDiv, aLink);
      insertElement(drawingNewItemTable.itemGrid, itemDiv);
    });
    insertElementAfterBegin(itemTable.parentNode, drawingNewItemTable.itemGrid);
    hideElement(itemTable);
  }
}

function testFolder(item) {
  return folderId !== 0 && item[2] !== folderId;
}

function testCraft(item) {
  return perfBox.checked && item[3] !== 'Perfect';
}

function afn(item) {
  var myDiv = item[0].parentNode.parentNode;
  toggleForce(myDiv, testFolder(item) || testCraft(item));
}

function reDrawGrid() {
  drawingNewItemTable();
  itemsAry.forEach(afn);
}

function doHideFolders(evt) {
  if (!evt.target.classList.contains('fshFolder')) {return;}
  var evtFid = Number(evt.target.dataset.folder);
  if (evtFid !== folderId) {
    folderId = evtFid;
    reDrawGrid();
  }
}

function getFolderId(item) {
  if (item.equipped) {return -2;}
  return item.folder_id;
}

function enhanceWarehouse() {
  itemsAry.forEach(function(item) {
    var invItem = invItems[item[1]];
    if (invItem) {
      item.push(getFolderId(invItem), invItem.craft);
    }
  });
}

function doFolderButtons(folders) {
  var inject = itemTable.parentNode.parentNode
    .previousElementSibling.firstElementChild;
  inject.classList.add('fshCenter');
  on(inject, 'click', doHideFolders);
  insertHtmlBeforeEnd(inject, makeFolderSpans(folders, true));
  return inject;
}

function doPerfSwitch(inject) {
  if (calf.cmd === 'crafting') {
    perfBox = {checked: false};
    return;
  }
  var perfLabel = createLabel({
    className: 'fshVMid',
    innerHTML: '<span class="fshLink">Perfect</span> '
  });
  perfBox = createInput({
    className: 'fshVMid',
    type: 'checkbox'
  });
  on(perfBox, 'change', reDrawGrid);
  insertElement(perfLabel, perfBox);
  insertHtmlBeforeEnd(inject, ' &ensp;');
  insertElement(inject, perfLabel);
}

function inventory(data) {
  if (data.items && itemTable) {
    invItems = data.items;
    add(4, enhanceWarehouse);
    var inject = doFolderButtons(data.folders);
    doPerfSwitch(inject);
  }
}

function getItems() {
  itemTable = whichTableHasItems();
  var imgList = itemTable.getElementsByTagName('img');
  itemsAry = Array.prototype.map.call(imgList, function(img) {
    var tipped = img.dataset.tipped;
    var matches = tipped.match(itemRE);
    return [img, matches[2]];
  });
}

export default function craftForge() {
  if (jQueryPresent()) {
    getInventoryById().done(inventory);
    add(3, getItems);
  }
}
