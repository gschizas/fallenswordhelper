import { g as getElementsByTagName, p as pCC, k as getArrayByTagName, A as getText, b2 as profile, D as getValue, f as on, H as querySelectorArray, T as sendEvent, S as setValue, M as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-b469667c.js';
import './batch-0e988765.js';
import './insertElementBefore-26cea2a0.js';
import './isChecked-81a663ed.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-6735e1ba.js';
import './dialogMsg-2350aeb0.js';
import './closest-f93141b8.js';
import './closestTable-64a3e852.js';
import './insertHtmlBeforeBegin-930e54b3.js';
import './addStatTotalToMouseover-1e14b971.js';
import { c as chunk } from './chunk-dce22fa8.js';
import { e as errorDialog } from './errorDialog-397bf548.js';
import './dialog-c2adaeab.js';
import './indexAjaxJson-c6108fea.js';
import './ajaxReturnCode-085fabfc.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-ebd132d2.js';
import injectStoreItems from './injectStoreItems-5a72de90.js';
import './senditems-b51e436b.js';
import './dropItem-a302a3e5.js';
import './createTr-6778862a.js';
import './makeFolderSpan-dbe9d16f.js';
import './makeFolderSpans-685ce153.js';
import './eventHandler5-f6565d5c.js';
import './cmdExport-b618c276.js';
import './guildStore-a2b43a1d.js';
import './getInventory-99f4a2da.js';
import './getInventoryById-cca426fd.js';
import './toggleForce-e3c93179.js';
import './selfIdIs-93954ad5.js';

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
  const tr = j.closest('tr');
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
//# sourceMappingURL=injectProfileDropItems-2bac324c.js.map
