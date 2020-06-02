import { g as getElementsByTagName, p as pCC, k as getArrayByTagName, A as getText, b1 as profile, D as getValue, f as on, H as querySelectorArray, U as sendEvent, T as setValue, N as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-f6498976.js';
import './batch-c7e20eca.js';
import './insertElementBefore-c846c522.js';
import './isChecked-b18ca318.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-fe263785.js';
import './dialogMsg-3ee1599c.js';
import './closest-07392fae.js';
import './closestTable-232e79d5.js';
import './insertHtmlBeforeBegin-664cf258.js';
import './addStatTotalToMouseover-d79e88ca.js';
import { c as chunk } from './chunk-3e87340c.js';
import { e as errorDialog } from './errorDialog-39a29964.js';
import './dialog-c5304eba.js';
import './indexAjaxJson-d6e4bb8c.js';
import './ajaxReturnCode-7f635355.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-c351a35c.js';
import injectStoreItems from './injectStoreItems-424554c8.js';
import './senditems-1d7ffb08.js';
import './dropItem-c11b4478.js';
import './createTr-876b8ff8.js';
import './makeFolderSpan-a7d1eaf0.js';
import './makeFolderSpans-d830717e.js';
import './eventHandler5-ef655b21.js';
import './cmdExport-04d8cb57.js';
import './guildStore-e39312dd.js';
import './getInventory-04903f78.js';
import './getInventoryById-691c7cb0.js';
import './toggleForce-da36c8d4.js';
import './selfIdIs-e6729ef3.js';
import { c as closestTr } from './closestTr-c7a10c8a.js';

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
//# sourceMappingURL=injectProfileDropItems-d57f5e79.js.map
