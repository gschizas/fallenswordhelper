import add from '../support/task';
import {createDiv} from '../common/cElement';
import equipItem from '../ajax/equipItem';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import insertElement from '../common/insertElement';
import on from '../common/on';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import {sendEvent} from '../support/fshGa';
import useItem from '../ajax/useItem';

function restyleBackpack() {
  var bpBack = getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
}

function backpackRemove(theBackpack, invId) { // jQuery.min
  var _invId = Number(invId);
  // remove from srcData
  var i = theBackpack.srcData.findIndex(function(el) {return el.a === _invId;});
  if (i !== -1) {theBackpack.srcData.splice(i, 1);}
}

function fastAction(theBackpack, evt, action, result) { // jQuery.min
  sendEvent('profile', 'fastAction - ' + result);
  var self = evt.target;
  var invId = self.parentNode.parentNode.children[0].dataset.inv;
  self.textContent = '';
  self.className = 'fastAction fshSpinner fshSpinner12';
  action(invId).done(function(data) {
    if (data.r !== 0) {
      self.remove();
      return;
    }
    backpackRemove(theBackpack, invId);
    self.classList.remove('fshSpinner');
    self.parentNode.innerHTML = '<span class="fastWorn">' + result + '</span>';
  });
}

function evtHdl(theBackpack, evt) {
  if (evt.target.classList.contains('fastWear')) {
    fastAction(theBackpack, evt, equipItem, 'Worn');
  }
  if (evt.target.classList.contains('fastUse')) {
    fastAction(theBackpack, evt, useItem, 'Used');
  }
}

function actionClass(usable) {
  if (usable) {return 'fastUse';}
  return 'fastWear';
}

function actionText(usable) {
  if (usable) {return 'Use';}
  return 'Wear';
}

function drawButtons(self, theSpan) {
  var toUse = theSpan.classList.contains('backpackContextMenuUsable');
  var myDiv = createDiv({
    className: 'fastDiv',
    innerHTML: '<span class="sendLink fastAction ' + actionClass(toUse) + '">' +
      actionText(toUse) + '</span>'
  });
  if (self.options.checkboxesEnabled) {
    insertElement(myDiv,
      theSpan.parentNode.nextElementSibling.nextElementSibling);
  }
  insertElement(theSpan.parentNode.parentNode, myDiv);
}

function fastWearLinks(self) {
  var items = querySelectorArray(
    '#backpackTab_' + self.type.toString() +
    ' .backpackContextMenuEquippable,.backpackContextMenuUsable');
  items.forEach(partial(drawButtons, self));
}

function foundBackpack(backpackContainer, theBackpack) {
  var oldShow = theBackpack._showPage;
  theBackpack._showPage = function(type, page) {
    if (!theBackpack.tabData) {return;}
    oldShow.call(theBackpack, type, page);
    fastWearLinks(theBackpack);
  };
  if (getElementById('backpack_current').textContent.length !== 0) {
    add(3, fastWearLinks, [theBackpack]);
  }
  on(backpackContainer, 'click', partial(evtHdl, theBackpack));
}

function initialiseFastWear() {
  var backpackContainer = getElementById('backpackContainer');
  var theBackpack = $(backpackContainer).data('backpack');
  if (theBackpack) {foundBackpack(backpackContainer, theBackpack);}
}

export default function injectFastWear() { // jQuery
  if (!getValue('enableQuickDrink')) {return;}
  restyleBackpack();
  initialiseFastWear();
}
