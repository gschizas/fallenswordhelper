import { g as getElementsByTagName, p as pCC, l as getArrayByTagName, B as getText, b0 as profile, G as getValue, f as on, E as querySelectorArray, W as sendEvent, V as setValue, D as querySelector, e as insertHtmlBeforeEnd } from './calfSystem-c0288c6c.js';
import './batch-eda68c17.js';
import './insertElementBefore-44fa3ff2.js';
import './isChecked-1ec16a19.js';
import { b as simpleCheckboxHtml } from './simpleCheckbox-988113ef.js';
import './dialogMsg-9bd4fc6f.js';
import './doStatTotal-9583de62.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-fcaed482.js';
import injectStoreItems from './injectStoreItems-45b3ceb8.js';
import './ajaxReturnCode-8b0a112c.js';
import './senditems-c1478d9d.js';
import './dropItem-8d095b74.js';
import './createTr-9586b48a.js';
import './makeFolderSpan-a39aaf44.js';
import './makeFolderSpans-c97386b6.js';
import './dialog-bd1f5d24.js';
import './indexAjaxJson-ebc8dc2e.js';
import './eventHandler5-66a55792.js';
import './cmdExport-a514288d.js';
import './guildStore-0ee3187d.js';
import './getInventory-2e8b95ab.js';
import './getInventoryById-d9a7d06e.js';
import './toggleForce-7b2b5e52.js';
import { c as chunk } from './chunk-2c7356da.js';
import './selfIdIs-84975389.js';
import './closest-a642edd4.js';
import { c as closestTr } from './closestTr-076ccf71.js';
import { e as errorDialog } from './errorDialog-ff08b5f8.js';

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
//# sourceMappingURL=injectProfileDropItems-0db4c07a.js.map
