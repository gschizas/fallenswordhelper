import add from '../support/task';
import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import {getValue} from '../support/system';
import {equipItem, useItem} from '../support/ajax';

function backpackRemove(invId) { // jQuery.min
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

function getInvId(self) {
  return self.parentNode.parentNode.firstElementChild.dataset.inv;
}

function fastAction(evt, action, result) { // jQuery.min
  var self = evt.target;
  var invId = getInvId(self);
  self.textContent = '';
  self.className = 'fastAction fshSpinner fshSpinner12';
  action(invId).done(function(data) {
    if (data.r !== 0) {return;}
    backpackRemove(invId);
    self.classList.remove('fshSpinner');
    self.parentNode.innerHTML = '<span class="fastWorn">' + result + '</span>';
  });
}

function fastWearUse(evt) {
  fastAction(evt, useItem, 'Used');
}

function fastWearEquip(evt) {
  fastAction(evt, equipItem, 'Worn');
}

function actionClass(usable) {
  if (usable) {return 'fastUse';}
  return 'fastWear';
}

function actionText(usable) {
  if (usable) {return 'Use';}
  return 'Wear';
}

function drawButtons(theSpan) {
  var toUse = theSpan.classList.contains('backpackContextMenuUsable');
  var myDiv = createDiv({
    className: 'fastDiv',
    innerHTML: '<span class="sendLink fastAction ' + actionClass(toUse) + '">' +
      actionText(toUse) + '</span>'
  });
  if (theSpan.parentNode.nextElementSibling) {
    myDiv.appendChild(theSpan.parentNode.nextElementSibling.nextElementSibling);
  }
  theSpan.parentNode.parentNode.appendChild(myDiv);
}

function fastWearLinks() {
  var bpTabs = getElementById('backpack_tabs');
  var type = bpTabs.getElementsByClassName('tab-selected')[0].dataset.type;
  var items = document.querySelectorAll('#backpackTab_' + type +
    ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, drawButtons);
}

function foundBackpack(backpackContainer, theBackpack) {
  var oldShow = theBackpack._showPage;
  theBackpack._showPage = function(type, page) {
    oldShow.call(theBackpack, type, page);
    fastWearLinks();
  };
  if (getElementById('backpack_current').textContent.length !== 0) {
    add(3, fastWearLinks);
  }
  backpackContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('fastWear')) {fastWearEquip(e);}
    if (e.target.classList.contains('fastUse')) {fastWearUse(e);}
  });
}

export default function injectFastWear() { // jQuery
  if (!getValue('enableQuickDrink')) {return;}
  var bpBack = getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
  var backpackContainer = getElementById('backpackContainer');
  var theBackpack = $(backpackContainer).data('backpack');
  if (theBackpack) {foundBackpack(backpackContainer, theBackpack);}
}
