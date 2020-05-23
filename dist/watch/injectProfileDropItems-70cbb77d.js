import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText, bl as profile, l as on, M as querySelectorArray } from './calfSystem-e592bbc5.js';
import './batch-3c9c2d16.js';
import './dialogMsg-a494feed.js';
import './closest-29c53b48.js';
import './closestTable-42ac6563.js';
import './insertHtmlBeforeBegin-ab8f757b.js';
import './addStatTotalToMouseover-5bc14909.js';
import { c as chunk } from './chunk-336c85f3.js';
import { e as errorDialog } from './errorDialog-06c6b640.js';
import './dialog-0a15f579.js';
import './ajaxReturnCode-48d0ed4c.js';
import injectStoreItems from './injectStoreItems-a08715d2.js';
import './senditems-0d491b3d.js';
import './dropItem-1fd999b5.js';
import './createTr-7da75adc.js';
import './makeFolderSpan-cdd30b04.js';
import './makeFolderSpans-6cbf2929.js';
import './eventHandler5-4c875000.js';
import './guildStore-d00770f9.js';
import './getInventory-56dd1228.js';
import './getInventoryById-432a191f.js';
import './selfIdIs-83b00001.js';

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
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  interceptDestroy
    interceptDestroy();
  }
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-70cbb77d.js.map
