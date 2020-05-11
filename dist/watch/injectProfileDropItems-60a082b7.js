import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText } from './calfSystem-05ea3a63.js';
import './batch-76c0e678.js';
import './dialogMsg-aee6b96b.js';
import './closest-114abad3.js';
import './closestTable-7369bb91.js';
import './insertHtmlBeforeBegin-ceb7d4ff.js';
import './addStatTotalToMouseover-b9bc7513.js';
import './chunk-f4016deb.js';
import './dialog-d81e4520.js';
import './ajaxReturnCode-2bbecc09.js';
import injectStoreItems from './injectStoreItems-c78c0597.js';
import './senditems-536a5f6c.js';
import './dropItem-c26aaaba.js';
import './createTr-08e98f10.js';
import './makeFolderSpan-d3bd4451.js';
import './makeFolderSpans-a8867987.js';
import './eventHandler5-bdc5d215.js';
import './guildStore-5a9cf220.js';
import './getInventory-68e07575.js';
import './getInventoryById-72fe98c9.js';
import './selfIdIs-f5aed12b.js';

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

function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-60a082b7.js.map
