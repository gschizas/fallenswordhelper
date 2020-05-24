import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText, bl as profile, G as getValue, l as on, M as querySelectorArray, a2 as sendEvent, a1 as setValue, S as querySelector, k as insertHtmlBeforeEnd } from './calfSystem-43606e5e.js';
import './batch-e431df3b.js';
import './isChecked-4b02211c.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-0c06997e.js';
import './dialogMsg-b9968a91.js';
import './closest-90712ffa.js';
import './closestTable-c8e351e9.js';
import './insertHtmlBeforeBegin-98fdbd22.js';
import './addStatTotalToMouseover-445d014b.js';
import { c as chunk } from './chunk-7031832f.js';
import { e as errorDialog } from './errorDialog-27781bc1.js';
import './dialog-6ee4241f.js';
import './ajaxReturnCode-2b6d49c6.js';
import injectStoreItems from './injectStoreItems-640543cc.js';
import './senditems-8bf97891.js';
import './dropItem-e07749e2.js';
import './createTr-47eb680b.js';
import './makeFolderSpan-436df65c.js';
import './makeFolderSpans-0eda69a3.js';
import './eventHandler5-247d47bf.js';
import './guildStore-e95e6c41.js';
import './getInventory-f9bcddb2.js';
import './getInventoryById-d34ea4de.js';
import './selfIdIs-21a794d5.js';

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
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  interceptDestroy
    interceptDestroy();
  }
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-3117fded.js.map
