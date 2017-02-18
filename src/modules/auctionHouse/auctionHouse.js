import * as ajax from '../support/ajax';
import * as system from '../support/system';

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
          'auction_id':
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

var inv;

function selectPerf() {
  var items = document.getElementById('auction-items')
    .getElementsByClassName('selectable-item');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(e) {
    var thisItem = e.id.replace('auction-item-', '');
    if (inv[thisItem].craft === 'Perfect') {e.click();}
  });
}

function drawFilters(data) {
  inv = data.items;
  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'fshAC';
  buttonDiv.insertAdjacentHTML('beforeend',
    '<button class="fshBl">Perfect</button>');
  document.getElementById('pCC').appendChild(buttonDiv);
  buttonDiv.addEventListener('click', selectPerf);
}

export function quickCreate() {
  ajax.getInventoryById().done(drawFilters);
}
