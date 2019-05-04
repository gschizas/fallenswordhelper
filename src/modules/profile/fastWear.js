import add from '../support/task';
import {createDiv} from '../common/cElement';
import equipItem from '../ajax/equipItem';
import {getElementById} from '../common/getElement';
import getText from '../common/getText';
import getValue from '../system/getValue';
import {imageServer} from '../system/system';
import insertElement from '../common/insertElement';
import on from '../common/on';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';
import {sendEvent} from '../support/fshGa';
import setText from '../common/setText';
import useItem from '../ajax/useItem';

var THEBACKPACK = 0;
var RESULT = 1;
var SELF = 2;
var INVID = 3;

function restyleBackpack() {
  var bpBack = getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
}

function thisInvId(_invId, el) {return el.a === _invId;}

function backpackRemove(theBackpack, invId) { // jQuery.min
  var _invId = Number(invId);
  // remove from srcData
  var i = theBackpack.srcData.findIndex(partial(thisInvId, _invId));
  if (i !== -1) {theBackpack.srcData.splice(i, 1);}
}

function actionResult(ary, data) {
  if (data.r !== 0) {
    ary[SELF].remove();
    return;
  }
  backpackRemove(ary[THEBACKPACK], ary[INVID]);
  ary[SELF].classList.remove('fshSpinner');
  ary[SELF].parentNode.innerHTML = '<span class="fastWorn">' +
    ary[RESULT] + '</span>';
}

function fastAction(theBackpack, evt, action, result) { // jQuery.min
  sendEvent('profile', 'fastAction - ' + result);
  var self = evt.target;
  var invId = self.parentNode.parentNode.children[0].dataset.inv;
  setText('', self);
  self.className = 'fastAction fshSpinner fshSpinner12';
  action(invId).then(partial(actionResult, [theBackpack, result, self, invId]));
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

function updateSrc(img, gif) {
  const url = imageServer + '/' + gif + '.gif';
  if (img.src !== url) {img.src = url;}
}

function doFolder(thisFolder, img) {
  if (img.dataset.folder === thisFolder) {
    updateSrc(img, 'folder_on');
  } else {
    updateSrc(img, 'folder');
  }
}

function fixFolders(theBackpack) {
  querySelectorArray('.backpackFolderImage')
    .forEach(partial(doFolder, String(theBackpack.folderId)));
}

function foundBackpack(backpackContainer, theBackpack) {
  var oldShow = theBackpack._showPage;
  theBackpack._showPage = function(type, page) {
    if (!theBackpack.tabData) {return;}
    fixFolders(theBackpack);
    oldShow.call(theBackpack, type, page);
    fastWearLinks(theBackpack);
  };
  if (getText(getElementById('backpack_current')).length !== 0) {
    add(3, fastWearLinks, [theBackpack]);
  }
  on(backpackContainer, 'click', partial(evtHdl, theBackpack));
}

function initialiseFastWear() {
  var backpackContainer = getElementById('backpackContainer');
  var theBackpack = $(backpackContainer).data('hcsBackpack');
  if (theBackpack) {foundBackpack(backpackContainer, theBackpack);}
}

export default function injectFastWear() { // jQuery
  if (!getValue('enableQuickDrink')) {return;}
  restyleBackpack();
  initialiseFastWear();
}
