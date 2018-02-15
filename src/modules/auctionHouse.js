import {createSpan} from './common/cElement';
import {getElementById} from './common/getElement';
import getValue from './system/getValue';
import {imageServer} from './system/system';
import insertElementAfterBegin from './common/insertElementAfterBegin';
import insertHtmlAfterBegin from './common/insertHtmlAfterBegin';
import jQueryNotPresent from './common/jQueryNotPresent';
import {pCC} from './support/layout';
import perfFilter from './common/perfFilter';
import retryAjax from './ajax/retryAjax';

function cancelAllAH() { // jQuery
  var cancelButtons = getElementById('resultRows')
    .getElementsByClassName('auctionCancel');
  if (cancelButtons.length === 0) {return;}
  var prm = [];
  for (var i = cancelButtons.length - 1; i >= 0; i -= 1) {
    var cancelButton = cancelButtons[i];
    var itemImage = cancelButton.parentNode.parentNode.firstElementChild
      .firstElementChild;
    cancelButton.outerHTML = '<img src="' + imageServer +
      '/skin/loading.gif" width="14" height="14">';
    prm.push(
      retryAjax({
        url: 'index.php?no_mobile=1&cmd=auctionhouse&subcmd=cancel',
        data: {auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1]}
      })
    );
  }
  $.when.apply($, prm).done(function() {
    getElementById('refresh').click();
  });
}

function makeCancelAll() {
  var cancelAll = createSpan({
    className: 'smallLink',
    textContent: 'Cancel All'
  });
  var fill = getElementById('fill').parentNode.parentNode
    .nextElementSibling.firstElementChild;
  fill.classList.add('fshCenter');
  insertHtmlAfterBegin(fill, ']');
  insertElementAfterBegin(fill, cancelAll);
  insertHtmlAfterBegin(fill, '[');
  cancelAll.addEventListener('click', cancelAllAH);
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
  getElementById('sort0').click();
}

export function quickCreate() {
  perfFilter('auction');
}
