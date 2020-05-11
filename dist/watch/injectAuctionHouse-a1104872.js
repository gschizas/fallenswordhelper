import { z as jQueryNotPresent, p as pCC, Z as clickThis, A as getElementById, aI as cdn, w as indexAjaxData, al as getArrayByClassName, T as createSpan, b8 as insertHtmlAfterBegin, f as insertElementAfterBegin, o as onclick, G as getValue } from './calfSystem-05ea3a63.js';
import './all-c9a2b6b5.js';
import { a as allthen } from './allthen-f9ff4d25.js';

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
    getElementById('auto-fill').checked = true;
  }
}

function injectAuctionHouse() {
  if (jQueryNotPresent() || !pCC) { return; }
  makeCancelAll();
  autoFill();
  clickThis(getElementById('sort0'));
}

export default injectAuctionHouse;
//# sourceMappingURL=injectAuctionHouse-a1104872.js.map
