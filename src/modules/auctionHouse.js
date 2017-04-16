import perfFilter from './common/perfFilter';
import * as layout from './support/layout';
import * as system from './support/system';

function cancelAllAH() { // jQuery
  var cancelButtons = document.getElementById('resultRows')
    .getElementsByClassName('auctionCancel');
  if (cancelButtons.length === 0) {return;}
  var prm = [];
  for (var i = cancelButtons.length - 1; i >= 0; i -= 1) {
    var cancelButton = cancelButtons[i];
    var itemImage = cancelButton.parentNode.parentNode.firstElementChild
      .firstElementChild;
    cancelButton.outerHTML = '<img src="' + system.imageServer +
      '/skin/loading.gif" width="14" height="14">';
    prm.push(
      $.post(
        'index.php?cmd=auctionhouse&subcmd=cancel', {
          auction_id:
            /inv_id=(\d+)/.exec(itemImage.getAttribute('data-tipped'))[1]
        }
      )
    );
  }
  $.when.apply($, prm).done(function() {
    document.getElementById('refresh').click();
  });
}

export function injectAuctionHouse() { // Native
  if (!layout.pCC) {return;}
  if (system.getValue('autoFillMinBidPrice')) {
    document.getElementById('auto-fill').checked = true;
  }
  document.getElementById('sort0').click();
  var cancelAll = document.createElement('span');
  cancelAll.className = 'smallLink';
  cancelAll.textContent = 'Cancel All';
  var fill = document.getElementById('fill').parentNode.parentNode
    .nextElementSibling.firstElementChild;
  fill.classList.add('fshCenter');
  fill.insertAdjacentHTML('afterbegin', ']');
  fill.insertAdjacentElement('afterbegin', cancelAll);
  fill.insertAdjacentHTML('afterbegin', '[');
  cancelAll.addEventListener('click', cancelAllAH);
}

export function quickCreate() { // Native
  perfFilter('auction');
}
