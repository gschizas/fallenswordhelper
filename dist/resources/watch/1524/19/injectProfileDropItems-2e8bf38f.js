import { g as getElementsByTagName, p as pCC, k as getArrayByTagName, A as getText, b1 as profile, D as getValue, f as on, H as querySelectorArray, U as sendEvent, T as setValue, N as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-03895320.js';
import './batch-2b9cfbe8.js';
import './insertElementBefore-1bcd7f1d.js';
import './isChecked-526af1cb.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-00a38d76.js';
import './dialogMsg-8a1f6974.js';
import './closest-6956725d.js';
import './closestTable-6f52bd33.js';
import './insertHtmlBeforeBegin-94b94a24.js';
import './addStatTotalToMouseover-9ee72690.js';
import { c as chunk } from './chunk-7884f004.js';
import { e as errorDialog } from './errorDialog-ac4542f2.js';
import './dialog-b2576a6e.js';
import './indexAjaxJson-22cdf082.js';
import './ajaxReturnCode-027e70a0.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-3f73e139.js';
import injectStoreItems from './injectStoreItems-15b059d8.js';
import './senditems-7830e7f5.js';
import './dropItem-4aba8d62.js';
import './createTr-f734079e.js';
import './makeFolderSpan-25c51351.js';
import './makeFolderSpans-94d00657.js';
import './eventHandler5-fed9d320.js';
import './cmdExport-8139127c.js';
import './guildStore-7c00455a.js';
import './getInventory-127cfa98.js';
import './getInventoryById-3858f29d.js';
import './toggleForce-01e59b03.js';
import './selfIdIs-2f3c8049.js';
import { c as closestTr } from './closestTr-bf590a13.js';

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
//# sourceMappingURL=injectProfileDropItems-2e8bf38f.js.map
