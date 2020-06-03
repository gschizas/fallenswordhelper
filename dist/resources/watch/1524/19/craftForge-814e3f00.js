import { j as jQueryPresent, a as add, g as getElementsByTagName, d as defTable, p as pCC, c as calf, b as createDiv, i as insertElement, o as onclick, e as insertHtmlBeforeEnd, f as on, h as itemRE, k as getArrayByTagName } from './calfSystem-03895320.js';
import { c as createInput } from './createInput-250e91b1.js';
import { c as createLabel } from './createLabel-55d60075.js';
import './insertElementBefore-1bcd7f1d.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-2a67008c.js';
import { h as hideElement } from './hideElement-17927f8d.js';
import './indexAjaxJson-22cdf082.js';
import './makeFolderSpan-25c51351.js';
import { m as makeFolderSpans } from './makeFolderSpans-94d00657.js';
import './cmdExport-8139127c.js';
import './guildStore-7c00455a.js';
import './getInventory-127cfa98.js';
import { g as getInventoryById } from './getInventoryById-3858f29d.js';
import { t as toggleForce } from './toggleForce-01e59b03.js';

var undefined$1 = undefined;

let itemTable;
let itemsAry;
let invItems;
let folderId = 0;
let perfBox;
let itemGrid;

function whichTableHasItems() {
  const allTables = getElementsByTagName(defTable, pCC.lastElementChild);
  if (calf.cmd === 'crafting') {
    return allTables[1];
  }
  return allTables[0];
}

function insertItem(item) {
  const itemDiv = createDiv();
  const aLink = item[0].parentNode;
  insertElement(itemDiv, aLink);
  insertElement(itemGrid, itemDiv);
}

function drawingNewItemTable() {
  if (!itemGrid) {
    itemGrid = createDiv({ className: 'fshItemGrid' });
    itemsAry.forEach(insertItem);
    insertElementAfterBegin(itemTable.parentNode, itemGrid);
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
  const myDiv = item[0].parentNode.parentNode;
  toggleForce(myDiv, testFolder(item) || testCraft(item));
}

function reDrawGrid() {
  drawingNewItemTable();
  itemsAry.forEach(afn);
}

function doHideFolders(evt) {
  if (!evt.target.classList.contains('fshFolder')) { return; }
  const evtFid = Number(evt.target.dataset.folder);
  if (evtFid !== folderId) {
    folderId = evtFid;
    reDrawGrid();
  }
}

function getFolderId(item) {
  if (item.equipped) { return -2; }
  return item.folder_id;
}

function addProps(item) {
  const invItem = invItems[item[1]];
  if (invItem) {
    item.push(getFolderId(invItem), invItem.craft);
  }
}

function enhanceWarehouse() {
  itemsAry.forEach(addProps);
}

function doFolderButtons(folders) {
  const inject = itemTable.parentNode.parentNode
    .previousElementSibling.children[0];
  inject.classList.add('fshCenter');
  onclick(inject, doHideFolders);
  insertHtmlBeforeEnd(inject, makeFolderSpans(folders, true));
  return inject;
}

function doPerfSwitch(inject) {
  if (calf.cmd === 'crafting') {
    perfBox = { checked: false };
    return;
  }
  const perfLabel = createLabel({
    className: 'fshVMid',
    innerHTML: '<span class="fshLink">Perfect</span> ',
  });
  perfBox = createInput({
    className: 'fshVMid',
    type: 'checkbox',
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
    const inject = doFolderButtons(data.folders);
    doPerfSwitch(inject);
  }
}

function imgItemId(img) {
  const { tipped } = img.dataset;
  const matches = tipped.match(itemRE);
  return [img, matches[2]];
}

function getItems() {
  itemTable = whichTableHasItems();
  itemsAry = getArrayByTagName('img', itemTable).map(imgItemId);
}

function craftForge() {
  if (jQueryPresent()) {
    getInventoryById().then(inventory);
    add(3, getItems);
  }
}

export default craftForge;
//# sourceMappingURL=craftForge-814e3f00.js.map
