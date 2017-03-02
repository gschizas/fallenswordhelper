import calf from './support/calf';
import * as ajax from './support/ajax';
import * as common from './support/common';
import * as dataObj from './support/dataObj';
import * as layout from './support/layout';
import * as system from './support/system';
import * as task from './support/task';

var disableItemColoring;
var showExtraLinks;
var showQuickDropLinks;
var showQuickSendLinks;
var extraLinks;
var paintCount;
var itemsAry;
var checkAll;
var itemsHash;
var dropLinks;
var invItems;
var colouring;
var sendLinks;

function moveItemsToFolder() { // jQuery.min
  var folderId = document.getElementById('selectFolderId').value;
  var batchNo;
  var counter = 0;
  var invList = [];
  var prm = [];
  itemsAry.forEach(function(o) {
    var el = o.injectHere.previousElementSibling.previousElementSibling
      .firstElementChild;
    if (el.checked) {
      batchNo = Math.floor(counter / 50);
      invList[batchNo] = invList[batchNo] || [];
      invList[batchNo].push(o.invid);
      counter += 1;
      if (counter % 50 === 0) {
        prm.push(ajax.moveItem(invList[batchNo], folderId));
      }
    }
  });
  if (counter % 50 !== 0) {
    prm.push(ajax.moveItem(invList[batchNo], folderId));
  }
  $.when.apply($, prm).done(function() {location.reload();});
}

function injectMoveItems() { // Native
  var flrRow = layout.pCC.getElementsByTagName('form')[0]
    .nextElementSibling.nextElementSibling.nextElementSibling;
  var folders = flrRow.getElementsByTagName('img');
  var flrEnabled;
  var oFlr;
  var options = '<tr><td class="fshCenter">Move selected items to: ' +
    '<select name="folder" id="selectFolderId" class="customselect">';
  Array.prototype.forEach.call(folders, function(e) {
    var src = e.getAttribute('src');
    if (src.indexOf('/folder_on.gif') !== -1) {flrEnabled = true;}
    if (src.indexOf('/folder.gif') !== -1) {
      oFlr = true;
      options += '<option value=' + e.parentNode.getAttribute('href')
        .match(/&folder_id=(-*\d+)/i)[1] + '>' +
        e.parentNode.parentNode.textContent + '</option>';
    }
  });
  if (!flrEnabled || !oFlr) {return;}
  options += '</select>&nbsp;<input type="button" class="custombutton" ' +
    'id="fshMove" value="Move"></td></tr>';
  flrRow.insertAdjacentHTML('afterend', options);
}

function doToggleButtons() { // Native
  // Option toggle buttons for both screens
  var insertHere = layout.pCC.getElementsByTagName('form')[0]
    .previousElementSibling.firstElementChild;
  var inject = '[<span id="fshShowExtraLinks" class="reportLink">' +
    (showExtraLinks ? 'Hide' : 'Show') +
    ' AH and UFSG links</span>]&nbsp;' +
    '[<span id="fshShowQuickDropLinks" class="reportLink">' +
    (showQuickDropLinks ? 'Hide' : 'Show') +
    ' Quick Drop links</span>]&nbsp;';
  if (calf.subcmd2 === 'storeitems') {
    inject += '[<span id="fshSelectAllGuildLocked" class="reportLink">' +
      ' Select All Guild Locked</span>]&nbsp;';
  }
  insertHere.innerHTML = inject;
}

function afterbegin(o, item) { // Native
  if (extraLinks || !showExtraLinks) {return;}
  var pattern = '<span><span class="aHLink">';
  if (!item.bound) {
    pattern += '[<a href="index.php?cmd=auctionhouse&search_text=' +
      encodeURIComponent(item.item_name) + '">AH</a>]';
  }
  pattern += '</span>[<a href="http://guide.fallensword.com/' +
    'index.php?cmd=items&subcmd=view&item_id=' + item.item_id +
    '" target="_blank">UFSG</a>]</span>';
  o.injectHere.insertAdjacentHTML('afterbegin', pattern);
}

function beforeend(o, item) { // Native
  var pattern = '';
  if (!checkAll && itemsHash[item.item_id] !== 1) {
    pattern += ' [<span linkto="' + item.item_id +
      '" class="fshLink">Check all</span>]';
  }
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(dataObj.rarity[item.rarity].clas);
  }
  if (!sendLinks && showQuickSendLinks && !item.bound) {
    pattern += ' <span class="quickAction sendLink tip-static" ' +
      'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
      'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
  }
  if (!dropLinks && showQuickDropLinks && item.guild_tag === '-1') {
    pattern += ' <span class="quickAction dropLink tip-static" itemInvId="' +
      o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
      'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
  }
  if (pattern !== '') {o.injectHere.insertAdjacentHTML('beforeend', pattern);}
}

function invPaint() { // Native - abstract this pattern
  var limit = performance.now() + 5;
  while (performance.now() < limit && paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];
    var item = invItems[o.invid];
    afterbegin(o, item);
    beforeend(o, item);
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    task.add(3, invPaint);
  } else {
    if (showExtraLinks) {extraLinks = true;}
    checkAll = true;
    colouring = true;
    if (showQuickDropLinks) {dropLinks = true;}
    sendLinks = true;
  }
}

function toggleShowExtraLinks() { // Native
  showExtraLinks = !showExtraLinks;
  system.setValue('showExtraLinks', showExtraLinks);
  doToggleButtons();
  if (!extraLinks) {
    paintCount = 0;
    task.add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      el.classList.toggle('fshHide');
    });
  }
}

function toggleShowQuickDropLinks() { // Native
  showQuickDropLinks = !showQuickDropLinks;
  system.setValue('showQuickDropLinks', showQuickDropLinks);
  doToggleButtons();
  if (!dropLinks) {
    paintCount = 0;
    task.add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.querySelector('.dropLink');
      el.classList.toggle('fshHide');
    });
  }
}

function anotherSpinner(self) { // Native
  self.innerHTML = '<img class="quickActionSpinner" src="' +
    system.imageServer +
    '/skin/loading.gif" width="15" height="15">';
}

function doCheckboxes(type, itemId) { // Native
  itemsAry.forEach(function(o) {
    var el = o.el.parentNode.parentNode.previousElementSibling
      .firstElementChild;
    if (type === 'guild') {
      el.checked = !el.disabled && invItems[o.invid].guild_tag !== '-1';
    }
    if (type === 'item' && invItems[o.invid].item_id === itemId) {
      el.checked = !el.disabled && !el.checked;
    }
  });
}

function quickAction(self, success, otherClass) { // jQuery.min
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  ajax.sendItem([itemInvId]).done(function(data) {
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = success;
  });
  $(self).qtip('hide');
  anotherSpinner(self);
  var theTd = self.parentNode;
  var otherButton = theTd.querySelector(otherClass);
  if (otherButton) {
    otherButton.className = 'quickAction';
    otherButton.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}

function evtHandler(evt) { // Native
  var self = evt.target;
  var myId = self.id;
  if (myId === 'fshShowExtraLinks') {toggleShowExtraLinks();}
  if (myId === 'fshShowQuickDropLinks') {toggleShowQuickDropLinks();}
  if (myId === 'fshSelectAllGuildLocked') {doCheckboxes('guild');}
  if (myId === 'fshMove') {moveItemsToFolder();}
  if (self.hasAttribute('linkto')) {
    doCheckboxes('item', evt.target.getAttribute('linkto'));
  }
  var myClasses = self.classList;
  if (myClasses.contains('sendLink')) {
    quickAction(evt.target, 'Sent', '.dropLink');
  }
  if (myClasses.contains('dropLink')) {
    quickAction(evt.target, 'Dropped', '.sendLink');
  }
}

function getItems() { // Native
  common.addStatTotalToMouseover();
  disableItemColoring = system.getValue('disableItemColoring');
  showExtraLinks = system.getValue('showExtraLinks');
  showQuickDropLinks = system.getValue('showQuickDropLinks');
  showQuickSendLinks = system.getValue('showQuickSendLinks');
  doToggleButtons();
  layout.pCC.addEventListener('click', evtHandler);
  var allTables = layout.pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  var imgList = lastTable.getElementsByTagName('img');
  itemsAry = [];
  itemsHash = {};
  Array.prototype.forEach.call(imgList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var matches = tipped.match(dataObj.itemRE);
    itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
    var injectHere = el.parentNode.parentNode.nextElementSibling;
    itemsAry.push({
      el: el,
      invid: matches[2],
      injectHere: injectHere
    });
  });
}

function inventory(data) { // Native
  // console.log('inventory', data);
  extraLinks = false;
  checkAll = false;
  invItems = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  paintCount = 0;
  task.add(3, invPaint);
}

function injectDropItems() { // Native
  ajax.getInventoryById().done(inventory);
  task.add(3, getItems);
}

export function injectProfileDropItems() { // Native
  injectDropItems();
  injectMoveItems();
}

export function injectStoreItems() { // Native
  injectDropItems();
}
