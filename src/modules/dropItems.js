import calf from './support/calf';
import * as task from './support/task';
import * as dataObj from './support/dataObj';
import * as system from './support/system';
import * as ajax from './support/ajax';
import * as common from './support/common';

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

function moveItemsToFolder() { // Bad jQuery
  var invList = [];
  $('input[name="removeIndex[]"]:checked').each(function(i) {
    var batchNo = Math.floor(i / 50);
    invList[batchNo] = invList[batchNo] || [];
    invList[batchNo].push($(this).val());
  });
  calf.moveItemsCallback = invList.length;
  invList.forEach(function(val) {
    $.ajax({
      dataType: 'json',
      url: 'index.php',
      data: {
        'cmd': 'profile',
        'subcmd': 'sendtofolder',
        'inv_list': JSON.stringify(val),
        'folder_id': $('#selectFolderId option:selected').val(),
        'ajax': 1
      },
      success: function() {
        calf.moveItemsCallback -= 1;
        if (calf.moveItemsCallback === 0) {location.reload();}
      }
    });
  });
}

function injectMoveItems() { // Bad jQuery
  var foldersEnabled = $('img[src$="/folder_on.gif"]');
  if (foldersEnabled.length !== 1) {return;}
  var otherFolders = $('#pCC a').has('img[src$="/folder.gif"]');
  if (otherFolders.length === 0) {return;}
  var select = $('<select name=folder id=selectFolderId class=' +
    'customselect></select>');
  otherFolders.each(function() {
    var self = $(this);
    select.append('<option value=' + self.attr('href')
    .match(/&folder_id=(-*\d+)/i)[1] + '>' +
    self.parent().text() + '</option>');
  });
  $('#pCC tr').has(otherFolders[0]).first().after($('<tr/>')
    .append($('<td class="fshCenter">Move selected items to: </td>')
      .append(select)
      .append('&nbsp;<input type="button" class="custombutton"' +
        ' id="fshMove" value="Move">')));
  $('#fshMove').click(moveItemsToFolder);
}

function doToggleButtons() { // Native
  // Option toggle buttons for both screens
  var insertHere = document.getElementById('pCC')
    .getElementsByTagName('form')[0].previousElementSibling.firstElementChild;
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

function dropItemsPaint() { // Native - abstract this pattern
  var limit = performance.now() + 5;
  while (performance.now() < limit && paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];
    if (!extraLinks && showExtraLinks) {
      o.injectHere.insertAdjacentHTML('afterbegin',
        '<span>[<a href="index.php?cmd=auctionhouse' +
        '&search_text=' + encodeURIComponent(o.itemName) +
        '">AH</a>] [<a href="http://guide.fallensword.com/' +
        'index.php?cmd=items&subcmd=view' + '&item_id=' + o.itemId +
        '" target="_blank">UFSG</a>]</span>');
    }
    if (!checkAll && itemsHash[o.itemId] !== 1) {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' [<span linkto="' + o.itemId +
        '" class="fshLink">Check all</span>]');
    }
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    task.add(3, dropItemsPaint);
  } else {
    if (showExtraLinks) {extraLinks = true;}
    checkAll = true;
  }
}

function toggleShowExtraLinks() { // Native
  showExtraLinks = !showExtraLinks;
  system.setValue('showExtraLinks', showExtraLinks);
  doToggleButtons();
  if (!extraLinks) {
    paintCount = 0;
    task.add(3, dropItemsPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      el.classList.toggle('fshHide');
    });
  }
}

function invPaint() { // Native
  var limit = performance.now() + 5;
  while (performance.now() < limit &&
      paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];

    var item = invItems[o.invid];
    if (!colouring && !disableItemColoring) {
      o.injectHere.classList.add(dataObj.rarity[item.rarity].clas);
    }
    if (!sendLinks && showQuickSendLinks &&
        !item.bound) {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>'
      );
    }
    if (!dropLinks && showQuickDropLinks &&
        item.guild_tag === '-1') {
      o.injectHere.insertAdjacentHTML('beforeend',
        ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>');
    }

    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    task.add(3, invPaint);
  } else {
    colouring = true;
    if (showQuickDropLinks) {dropLinks = true;}
    sendLinks = true;
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
      el.checked = !el.disabled &&
        invItems[o.invid].guild_tag !== '-1' ?
        true : false;
    }
    if (type === 'item' && o.itemId === itemId) {
      el.checked = !el.disabled && !el.checked ? true : false;
    }
  });
}

function quickSendItem(evt){ // jQuery
  var self = evt.target;
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  ajax.sendItem([itemInvId]).done(function(data){
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = 'Sent';
  });
  $(self).qtip('hide');
  anotherSpinner(self);
  var theTd = self.parentNode;
  var quickDrop = theTd.querySelector('.dropLink');
  if (quickDrop) {
    quickDrop.className = 'quickAction';
    quickDrop.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}

function quickDropItem(evt){ // jQuery
  var self = evt.target;
  self.className = 'quickAction';
  var itemInvId = self.getAttribute('itemInvId');
  ajax.dropItem([itemInvId]).done(function(data){
    if (data.r === 1) {return;}
    self.style.color = 'green';
    self.innerHTML = 'Dropped';
  });
  $(self).qtip('hide');
  anotherSpinner(self);
  var theTd = self.parentNode;
  var quickSend = theTd.querySelector('.sendLink');
  if (quickSend) {
    quickSend.className = 'quickAction';
    quickSend.innerHTML = '';
  }
  var checkbox = theTd.parentNode.firstElementChild.firstElementChild;
  checkbox.checked = false;
  checkbox.disabled = true;
}

function evtHandler(evt) { // Native
  if (evt.target.tagName !== 'SPAN') {return;}
  var self = evt.target;
  var myId = self.id;
  if (myId === 'fshShowExtraLinks') {toggleShowExtraLinks();}
  if (myId === 'fshShowQuickDropLinks') {toggleShowQuickDropLinks();}
  if (myId === 'fshSelectAllGuildLocked') {doCheckboxes('guild');}
  if (self.hasAttribute('linkto')) {
    doCheckboxes('item', evt.target.getAttribute('linkto'));}
  var myClasses = self.classList;
  if (myClasses.contains('sendLink')) {quickSendItem(evt);}
  if (myClasses.contains('dropLink')) {quickDropItem(evt);}
}

function getItems() { // Native
  common.addStatTotalToMouseover();
  disableItemColoring = system.getValue('disableItemColoring');
  showExtraLinks = system.getValue('showExtraLinks');
  showQuickDropLinks = system.getValue('showQuickDropLinks');
  showQuickSendLinks = system.getValue('showQuickSendLinks');
  doToggleButtons();

  var pCC = document.getElementById('pCC');
  pCC.addEventListener('click', evtHandler);
  var allTables = pCC.getElementsByTagName('table');
  var lastTable = allTables[allTables.length - 1];
  var imgList = lastTable.getElementsByTagName('img');
  itemsAry = [];
  itemsHash = {};
  Array.prototype.forEach.call(imgList, function(el) {
    var tipped = el.getAttribute('data-tipped');
    var matches = tipped.match(dataObj.itemRE);
    itemsHash[matches[1]] = (itemsHash[matches[1]] || 0) + 1;
    var injectHere = el.parentNode.parentNode.nextElementSibling;
    var itemName = injectHere.textContent.trim();
    itemsAry.push({
      el: el, itemId: matches[1], invid: matches[2],
      injectHere: injectHere, itemName: itemName});
  });

  extraLinks = false;
  checkAll = false;
  paintCount = 0;
  task.add(3, dropItemsPaint);
}

function inventory(data) { // Native
  invItems = data.items.reduce(function(prev, curr) {
    prev[curr.inv_id] = curr;
    return prev;
  }, {});
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  paintCount = 0;
  task.add(3, invPaint);
}

function injectDropItems() { // Native
  ajax.getInventory().done(inventory);
  task.add(3, getItems);
}

export function injectProfileDropItems() { // Native
  injectDropItems();
  injectMoveItems();
}

export function injectStoreItems() { // Native
  injectDropItems();
}
