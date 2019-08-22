import allthen from './common/allthen';
import {cdn} from './system/system';
import clickThis from './common/clickThis';
import {createSpan} from './common/cElement';
import getArrayByClassName from './common/getArrayByClassName';
import {getElementById} from './common/getElement';
import getValue from './system/getValue';
import indexAjaxData from './ajax/indexAjaxData';
import insertElementAfterBegin from './common/insertElementAfterBegin';
import insertHtmlAfterBegin from './common/insertHtmlAfterBegin';
import jQueryNotPresent from './common/jQueryNotPresent';
import on from './common/on';
import {pCC} from './support/layout';
import perfFilter from './common/perfFilter';

function doRefresh() {
  clickThis(getElementById('refresh'));
}

function doCancel(cancelButton) { // jQuery.min
  var itemImage = cancelButton.parentNode.parentNode.children[0].children[0];
  cancelButton.outerHTML = '<img src="' + cdn +
    'ui/misc/spinner.gif" width="14" height="14">';
  return indexAjaxData({
    cmd: 'auctionhouse',
    subcmd: 'cancel',
    auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1]
  });
}

function cancelAllAH() {
  var cancelButtons = getArrayByClassName('auctionCancel',
    getElementById('resultRows'));
  if (cancelButtons.length === 0) {return;}
  var prm = cancelButtons.map(doCancel);
  allthen(prm, doRefresh);
}

function makeCancelAll() {
  var cancelAll = createSpan({
    className: 'smallLink',
    textContent: 'Cancel All'
  });
  var fill = getElementById('fill').parentNode.parentNode
    .nextElementSibling.children[0];
  fill.classList.add('fshCenter');
  insertHtmlAfterBegin(fill, ']');
  insertElementAfterBegin(fill, cancelAll);
  insertHtmlAfterBegin(fill, '[');
  on(cancelAll, 'click', cancelAllAH);
}

function autoFill() {
  if (getValue('autoFillMinBidPrice')) {
    getElementById('auto-fill').checked = true;
  }
}

export function injectAuctionHouse() {
  if (jQueryNotPresent() || !pCC) {return;}
  makeCancelAll();
  autoFill();
  clickThis(getElementById('sort0'));
}

export function quickCreate() {
  perfFilter('auction');
}
