import {createSpan} from './common/cElement';
import {pCC} from './support/layout';
import perfFilter from './common/perfFilter';
import retryAjax from './ajax/retryAjax';
import {getValue, imageServer} from './support/system';

function cancelAllAH() { // jQuery
  var cancelButtons = document.getElementById('resultRows')
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
        url: 'index.php?cmd=auctionhouse&subcmd=cancel',
        data: {auction_id: /inv_id=(\d+)/.exec(itemImage.dataset.tipped)[1]}
      })
    );
  }
  $.when.apply($, prm).done(function() {
    document.getElementById('refresh').click();
  });
}

export function injectAuctionHouse() {
  if (!pCC) {return;}
  if (getValue('autoFillMinBidPrice')) {
    document.getElementById('auto-fill').checked = true;
  }
  document.getElementById('sort0').click();
  var cancelAll = createSpan({
    className: 'smallLink',
    textContent: 'Cancel All'
  });
  var fill = document.getElementById('fill').parentNode.parentNode
    .nextElementSibling.firstElementChild;
  fill.classList.add('fshCenter');
  fill.insertAdjacentHTML('afterbegin', ']');
  fill.insertAdjacentElement('afterbegin', cancelAll);
  fill.insertAdjacentHTML('afterbegin', '[');
  cancelAll.addEventListener('click', cancelAllAH);
}

export function quickCreate() {
  perfFilter('auction');
}
