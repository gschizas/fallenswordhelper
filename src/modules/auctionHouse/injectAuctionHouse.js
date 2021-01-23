import allthen from '../common/allthen';
import { cdn } from '../system/system';
import clickThis from '../common/clickThis';
import createSpan from '../common/cElement/createSpan';
import doStatTotal from '../profile/doStatTotal';
import getArrayByClassName from '../common/getArrayByClassName';
import getElementById from '../common/getElement';
import getValue from '../system/getValue';
import indexAjaxData from '../ajax/indexAjaxData';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';
import jQueryNotPresent from '../common/jQueryNotPresent';
import onclick from '../common/onclick';
import { pCC } from '../support/layout';

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

export default function injectAuctionHouse() {
  if (jQueryNotPresent() || !pCC) { return; }
  makeCancelAll();
  autoFill();
  doStatTotal();
  // clickThis(getElementById('sort0'));
}
