import { g as getElementsByTagName, p as pCC, n as getArrayByTagName, $ as insertHtmlAfterEnd, D as getText } from './calfSystem-69cf053a.js';
import './batch-1065bc4f.js';
import './dialogMsg-a23742d3.js';
import './closest-0e129511.js';
import './closestTable-c4790ef5.js';
import './insertHtmlBeforeBegin-055f1704.js';
import './addStatTotalToMouseover-b844dbcd.js';
import './chunk-5cd6bf7d.js';
import './dialog-3331db38.js';
import './ajaxReturnCode-b66bc090.js';
import injectStoreItems from './injectStoreItems-6f12f73c.js';
import './senditems-76f6ce22.js';
import './dropItem-68b740e7.js';
import './createTr-9258cf01.js';
import './makeFolderSpan-e92e1739.js';
import './makeFolderSpans-a5a078f5.js';
import './eventHandler5-2dacf7ed.js';
import './guildStore-fce0fc07.js';
import './getInventory-1b3593f6.js';
import './getInventoryById-90dd6e7a.js';
import './selfIdIs-2c56d44e.js';

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
//# sourceMappingURL=injectProfileDropItems-829abfb0.js.map
