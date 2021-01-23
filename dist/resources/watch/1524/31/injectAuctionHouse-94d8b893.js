import { a as allthen } from './allthen-3a9178b8.js';
import { x as jQueryNotPresent, p as pCC, Q as clickThis, y as getElementById, ak as cdn, u as indexAjaxData, a9 as insertHtmlAfterBegin, o as onclick, H as getValue } from './calfSystem-91adbec8.js';
import { c as createSpan } from './createSpan-0e3d85b1.js';
import { d as doStatTotal } from './doStatTotal-0bcf773c.js';
import { g as getArrayByClassName } from './getArrayByClassName-2ad645e6.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-beaa69ff.js';
import './all-6dfbd6b8.js';
import './insertElementBefore-43970b1f.js';

function doRefresh() {
  clickThis(getElementById('refresh'));
}

function doCancel(cancelButton) { // jQuery.min
  const itemImage = cancelButton.parentNode.parentNode.children[0].children[0];
  // eslint-disable-next-line no-param-reassign
  cancelButton.outerHTML = `<img src="${
    cdn}ui/misc/spinner.gif" width="14" height="14">`;
  return indexAjaxData({
    cmd: 'auctionhouse',
    subcmd: 'cancel',
    auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1],
  });
}

function cancelAllAH() {
  const cancelButtons = getArrayByClassName('auctionCancel',
    getElementById('resultRows'));
  if (cancelButtons.length === 0) { return; }
  const prm = cancelButtons.map(doCancel);
  allthen(prm, doRefresh);
}

function makeCancelAll() {
  const cancelAll = createSpan({
    className: 'smallLink',
    textContent: 'Cancel All',
  });
  const fill = getElementById('fill').parentNode.parentNode
    .nextElementSibling.children[0];
  fill.classList.add('fshCenter');
  insertHtmlAfterBegin(fill, ']');
  insertElementAfterBegin(fill, cancelAll);
  insertHtmlAfterBegin(fill, '[');
  onclick(cancelAll, cancelAllAH);
}

function autoFill() {
  if (getValue('autoFillMinBidPrice')) {
    // getElementById('auto-fill').checked = true;
    clickThis(getElementById('auto-fill'));
  }
}

function injectAuctionHouse() {
  if (jQueryNotPresent() || !pCC) { return; }
  makeCancelAll();
  autoFill();
  doStatTotal();
  // clickThis(getElementById('sort0'));
}

export default injectAuctionHouse;
//# sourceMappingURL=injectAuctionHouse-94d8b893.js.map
