import * as ajax from '../support/ajax';
import * as system from '../support/system';
import * as task from '../support/task';

function backpackRemove(invId) { // jQuery
  var _invId = parseInt(invId, 10);
  var theBackpack = $('#backpackContainer').data('backpack');
  // remove from srcData
  theBackpack.srcData.some(function(el, i, ary) {
    if (el.a === _invId) {
      ary.splice(i, 1);
      return true;
    }
    return false;
  });
}

function fastWearUse(evt) { // jQuery
  var InventoryItemID = evt.target.getAttribute('itemID');
  ajax.useItem(InventoryItemID).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove(InventoryItemID);
    evt.target.parentNode.innerHTML = '<span class="fastWorn">Used</span>';
  });
}

function fastWearEquip(e) { // jQuery
  var self = e.target;
  var invId = self.getAttribute('itemid');
  ajax.equipItem(invId).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove(invId);
    // TODO Insert item from worn
    self.parentNode.innerHTML = '<span class="fastWorn">Worn</span>';
  });
}

function fastWearLinks() { // Native
  var bpTabs = document.getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0]
    .getAttribute('data-type');
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(theSpan) {
    var toUse = theSpan.classList.contains('backpackContextMenuUsable');
    var myDiv = document.createElement('DIV');
    myDiv.className = 'fastDiv';
    myDiv.insertAdjacentHTML('beforeend', '<span class="' +
      (toUse ? 'fastUse' : 'fastWear') + '" itemid="' +
      theSpan.getAttribute('data-inv') + '">' +
      (toUse ? 'Use' : 'Wear') + '</span>&nbsp;');
    if (theSpan.parentNode.nextElementSibling) {
      myDiv.appendChild(
        theSpan.parentNode.nextElementSibling.nextElementSibling);
    }
    theSpan.parentNode.parentNode.appendChild(myDiv);
  });
}

export function injectFastWear() { // jQuery
  if (!system.getValue('enableQuickDrink')) {return;}
  var bpBack = document.getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
  var backpackContainer = document.getElementById('backpackContainer');
  var theBackpack = $(backpackContainer).data('backpack');
  var oldShow = theBackpack._showPage;
  theBackpack._showPage = function(type, page) {
    oldShow.call(theBackpack, type, page);
    fastWearLinks();
  };
  if (document.getElementById('backpack_current').textContent.length !== 0) {
    task.add(3, fastWearLinks);
  }
  backpackContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('fastWear')) {fastWearEquip(e);}
    if (e.target.classList.contains('fastUse')) {fastWearUse(e);}
  });
}
