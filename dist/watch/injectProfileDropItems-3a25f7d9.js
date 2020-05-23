import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText, bl as profile, l as on, M as querySelectorArray } from './calfSystem-cb5d894f.js';
import './batch-cb4a648a.js';
import './dialogMsg-c1a3f0ce.js';
import './closest-19907d7f.js';
import './closestTable-fa5dbe07.js';
import './insertHtmlBeforeBegin-4634c212.js';
import './addStatTotalToMouseover-d102257d.js';
import { c as chunk } from './chunk-57888cfe.js';
import { e as errorDialog } from './errorDialog-3596e400.js';
import './dialog-7dbf763d.js';
import './ajaxReturnCode-9c192fc3.js';
import injectStoreItems from './injectStoreItems-f26eae57.js';
import './senditems-a0d59896.js';
import './dropItem-b78ce222.js';
import './createTr-c3e88cbe.js';
import './makeFolderSpan-7165377c.js';
import './makeFolderSpans-760468ab.js';
import './eventHandler5-d791636b.js';
import './guildStore-3dc6832c.js';
import './getInventory-110319a7.js';
import './getInventoryById-7536e95b.js';
import './selfIdIs-15bc72e1.js';

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
  if (!e.returnValue) { return; }
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
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  interceptDestroy
    interceptDestroy();
  }
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-3a25f7d9.js.map
