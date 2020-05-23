import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText, bl as profile, l as on, M as querySelectorArray } from './calfSystem-5ce1fc75.js';
import './batch-c808adb7.js';
import './dialogMsg-e44c1b78.js';
import './closest-696bb1a1.js';
import './closestTable-76cc3ad1.js';
import './insertHtmlBeforeBegin-28b28498.js';
import './addStatTotalToMouseover-83411bc9.js';
import { c as chunk } from './chunk-4895d19a.js';
import { e as errorDialog } from './errorDialog-072758db.js';
import './dialog-d7c6a95b.js';
import './ajaxReturnCode-dc7460e3.js';
import injectStoreItems from './injectStoreItems-a60918f4.js';
import './senditems-f3127992.js';
import './dropItem-7b895e4a.js';
import './createTr-1eda971a.js';
import './makeFolderSpan-afbc6daa.js';
import './makeFolderSpans-d985735f.js';
import './eventHandler5-3f8a2864.js';
import './guildStore-d116d611.js';
import './getInventory-29559628.js';
import './getInventoryById-219bcbba.js';
import './selfIdIs-0d226eda.js';

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
//# sourceMappingURL=injectProfileDropItems-15b5e788.js.map
