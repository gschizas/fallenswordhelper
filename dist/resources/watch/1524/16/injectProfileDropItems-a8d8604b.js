import { g as getElementsByTagName, p as pCC, k as getArrayByTagName, A as getText, b1 as profile, D as getValue, f as on, H as querySelectorArray, U as sendEvent, T as setValue, N as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-6e4b53e3.js';
import './batch-b57e96ed.js';
import './insertElementBefore-6a4c4d6a.js';
import './isChecked-aa4fe178.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-91bd42e6.js';
import './dialogMsg-ab1e4fbb.js';
import './closest-c88159b8.js';
import './closestTable-86bb79bc.js';
import './insertHtmlBeforeBegin-4da82bee.js';
import './addStatTotalToMouseover-2b218e32.js';
import { c as chunk } from './chunk-f643a731.js';
import { e as errorDialog } from './errorDialog-9b126515.js';
import './dialog-e7c94c6d.js';
import './indexAjaxJson-3f2c1d04.js';
import './ajaxReturnCode-873ef21a.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-02106a94.js';
import injectStoreItems from './injectStoreItems-1acba9a4.js';
import './senditems-05aac690.js';
import './dropItem-d17f5d35.js';
import './createTr-3f08cffe.js';
import './makeFolderSpan-84bffc01.js';
import './makeFolderSpans-e1b54118.js';
import './eventHandler5-bc478e0c.js';
import './cmdExport-67d5e685.js';
import './guildStore-a1fd8786.js';
import './getInventory-388e0bde.js';
import './getInventoryById-c044b70b.js';
import './toggleForce-0d836f31.js';
import './selfIdIs-1d8c0550.js';
import { c as closestTr } from './closestTr-77eb7cb6.js';

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

const prefAjaxifyDestroy = 'ajaxifyDestroy';
let ajaxifyDestroy;

const removeRow = (j) => {
  const tr = closestTr(j);
  tr.nextElementSibling.remove();
  tr.remove();
};

const destroyChunk = (itemsAry) => {
  daDropItems(itemsAry.map((i) => i.value))
    .then(errorDialog)
    .then((json) => {
      if (!json.s) { return; }
      itemsAry.forEach(removeRow);
    });
};

const checkItems = (e) => {
  if (!e.returnValue || !ajaxifyDestroy) { return; }
  e.preventDefault();
  const items = querySelectorArray('[name="removeIndex[]"]:checked');
  chunk(30, items).forEach(destroyChunk);
  sendEvent('profileDropitems', 'Destroy by AJAX');
};

function changePref() {
  ajaxifyDestroy = !ajaxifyDestroy;
  setValue(prefAjaxifyDestroy, ajaxifyDestroy);
}

const injectPref = () => {
  const submitBtn = querySelector('input[type="submit"]');
  insertHtmlBeforeEnd(submitBtn.parentNode,
    `&nbsp;&nbsp;${simpleCheckboxHtml(prefAjaxifyDestroy)}`);
  on(submitBtn.parentNode, 'change', changePref);
};

function interceptDestroy() {
  injectPref();
  ajaxifyDestroy = getValue(prefAjaxifyDestroy);
  on(document.forms[0], 'submit', checkItems);
}

function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
  interceptDestroy();
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-a8d8604b.js.map
