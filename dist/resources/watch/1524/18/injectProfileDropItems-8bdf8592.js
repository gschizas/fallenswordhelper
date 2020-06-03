import { g as getElementsByTagName, p as pCC, k as getArrayByTagName, A as getText, b1 as profile, D as getValue, f as on, H as querySelectorArray, U as sendEvent, T as setValue, N as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-940bc1b5.js';
import './batch-620f0137.js';
import './insertElementBefore-4c8d2347.js';
import './isChecked-475781f3.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-0111405d.js';
import './dialogMsg-cdeff92d.js';
import './closest-3a8e7614.js';
import './closestTable-fb56f36b.js';
import './insertHtmlBeforeBegin-e5e9560b.js';
import './addStatTotalToMouseover-a199ddb5.js';
import { c as chunk } from './chunk-07c1f860.js';
import { e as errorDialog } from './errorDialog-1630e28b.js';
import './dialog-d31b92fc.js';
import './indexAjaxJson-c1eaa5d5.js';
import './ajaxReturnCode-4766dec9.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f1bd8788.js';
import injectStoreItems from './injectStoreItems-fbaa853c.js';
import './senditems-de3f81e3.js';
import './dropItem-cdeac317.js';
import './createTr-9a042a21.js';
import './makeFolderSpan-cb617c61.js';
import './makeFolderSpans-af7e419a.js';
import './eventHandler5-c46db7ef.js';
import './cmdExport-76b2dc80.js';
import './guildStore-0f30ae9c.js';
import './getInventory-22d89aeb.js';
import './getInventoryById-cab4fa8e.js';
import './toggleForce-66dc2560.js';
import './selfIdIs-c5c081f7.js';
import { c as closestTr } from './closestTr-746f9cb4.js';

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
//# sourceMappingURL=injectProfileDropItems-8bdf8592.js.map
