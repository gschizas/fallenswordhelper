import add from '../support/task';
import calf from '../support/calf';
import getInventoryById from '../ajax/getInventoryById';
import {itemRE} from '../support/dataObj';
import makeFolderSpans from '../common/makeFolderSpans';
import {pCC} from '../support/layout';
import toggleForce from '../common/toggleForce';
import {createDiv, createInput, createLabel} from '../common/cElement';

var itemTable;
var itemsAry;
var invItems;
var folderId = '0';
var perfBox;

function whichTableHasItems() {
  var allTables = pCC.getElementsByTagName('table');
  if (calf.cmd === 'crafting') {
    return allTables[2];
  }
  return allTables[1];
}

function drawingNewItemTable() {
  if (!drawingNewItemTable.itemGrid) {
    drawingNewItemTable.itemGrid = createDiv({className: 'fshItemGrid'});
    itemsAry.forEach(function(item) {
      var itemDiv = createDiv();
      var aLink = item[0].parentNode;
      itemDiv.appendChild(aLink);
      drawingNewItemTable.itemGrid.appendChild(itemDiv);
    });
    itemTable.parentNode.insertAdjacentElement('afterbegin',
      drawingNewItemTable.itemGrid);
    itemTable.classList.add('fshHide');
  }
}

function reDrawGrid() {
  drawingNewItemTable();
  itemsAry.forEach(function(item) {
    var myDiv = item[0].parentNode.parentNode;
    toggleForce(myDiv, folderId !== '0' && item[2] !== folderId ||
      perfBox.checked && item[3] !== 'Perfect');
  });
}

function doHideFolders(evt) {
  if (!evt.target.classList.contains('fshFolder')) {return;}
  var evtFid = evt.target.dataset.folder;
  if (evtFid !== folderId) {
    folderId = evtFid;
    reDrawGrid();
  }
}

function getFolderId(item) {
  if (item.equipped) {return '-2';}
  return item.folder_id;
}

function enhanceWarehouse() {
  itemsAry.forEach(function(item) {
    var invItem = invItems[item[1]];
    item.push(getFolderId(invItem), invItem.craft);
  });
}

function doFolderButtons(folders) {
  var inject = itemTable.parentNode.parentNode
    .previousElementSibling.firstElementChild;
  inject.classList.add('fshCenter');
  inject.addEventListener('click', doHideFolders);
  inject.insertAdjacentHTML('beforeend', makeFolderSpans(folders, true));
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
  perfBox.addEventListener('change', reDrawGrid);
  perfLabel.appendChild(perfBox);
  inject.insertAdjacentHTML('beforeend', ' &ensp;');
  inject.appendChild(perfLabel);
}

function inventory(data) {
  invItems = data.items;
  add(4, enhanceWarehouse);
  var inject = doFolderButtons(data.folders);
  doPerfSwitch(inject);
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
  getInventoryById().done(inventory);
  add(3, getItems);
}
