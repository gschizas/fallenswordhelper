import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText, bl as profile, l as on, M as querySelectorArray } from './calfSystem-98d7118c.js';
import './batch-e0680c2f.js';
import './dialogMsg-a4fe0fc3.js';
import './closest-3d46eee5.js';
import './closestTable-982dbd70.js';
import './insertHtmlBeforeBegin-ede01c94.js';
import './addStatTotalToMouseover-ddc7e0a5.js';
import { c as chunk } from './chunk-ffbf6bbd.js';
import { e as errorDialog } from './errorDialog-63025bee.js';
import './dialog-e28ca3fe.js';
import './ajaxReturnCode-8e7c5aaf.js';
import injectStoreItems from './injectStoreItems-8e78a20b.js';
import './senditems-0f336573.js';
import './dropItem-fe99654b.js';
import './createTr-552d639c.js';
import './makeFolderSpan-944d4208.js';
import './makeFolderSpans-1608f3b4.js';
import './eventHandler5-28f32313.js';
import './guildStore-3cffb46e.js';
import './getInventory-23c9b684.js';
import './getInventoryById-9a50ec40.js';
import './selfIdIs-6239d716.js';

const otherFolders = (el) => el.src.includes('/folder.png');

function makeOption(e) {
  return `<option value=${
    e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]}>${
    getText(e.parentNode.parentNode)}</option>`;
}

function injectMoveItems() {
  const flrRow = getElementsByTagName('form', pCC)[0]
    .nextElementSibling.nextElementSibling.nextElementSibling;
  const folders = getArrayByTagName('img', flrRow).filter(otherFolders);
  if (folders.length === 0) { return; }
  insertHtmlAfterEnd(flrRow,
    '<tr><td class="fshCenter">Move selected items to: '
      + `<select name="folder" id="selectFolderId" class="customselect">${
        folders.map(makeOption).join('')
      }</select>&nbsp;<input type="button" class="custombutton" `
      + 'id="fshMove" value="Move"></td></tr>');
}

function dodropitems(itemsAry) {
  return profile({
    subcmd: 'dodropitems',
    removeIndex: itemsAry,
  });
}

function daDropItems(itemsAry) {
  return dodropitems(itemsAry);
}

const destroyChunk = (itemsAry) => {
  daDropItems(itemsAry.map((i) => i.value))
    .then(errorDialog)
    .then((json) => {
      if (!json.s) { return; }
      itemsAry.forEach((j) => {
        const tr = j.closest('tr');
        tr.nextElementSibling.remove();
        tr.remove();
      });
    });
};

const checkItems = (e) => {
  e.preventDefault();
  const items = querySelectorArray('[name="removeIndex[]"]:checked');
  chunk(30, items).forEach(destroyChunk);
};

function interceptDestroy() {
  on(document.forms[0], 'submit', checkItems);
}

function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
  interceptDestroy();
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-16935a36.js.map
