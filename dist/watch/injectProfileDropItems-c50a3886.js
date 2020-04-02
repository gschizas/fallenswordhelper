import { g as getElementsByTagName, p as pCC, a as getArrayByTagName, i as insertHtmlAfterEnd, b as getText, c as partial, e as def_table, f as insertHtmlAfterBegin, h as calf, j as createTr, k as createTd, l as insertElement, m as insertElementBefore, n as makeFolderSpans, o as playerId, t as toggleForce, q as entries, r as batch, s as isArray, u as daSendToFolder, v as getElementById, w as chunk, x as cdn, y as querySelector, z as hideQTip, A as setValue, B as getValue, C as itemRE, D as addStatTotalToMouseover, E as jQueryNotPresent, F as getInventoryById, G as add, H as fallback, I as ahSearchUrl, J as guideUrl, K as def_subcmd, L as rarity, M as insertHtmlBeforeEnd, N as selfIdIs, O as hasClass, P as ajaxSendItems, Q as dropItem, R as onclick, S as eventHandler5 } from './calfSystem-aa4abd33.js';

const otherFolders = el => el.src.includes('/folder.png');

function makeOption(e) {
  return '<option value=' +
    e.parentNode.href.match(/&folder_id=(-?\d+)/i)[1] + '>' +
    getText(e.parentNode.parentNode) + '</option>';
}

function injectMoveItems() {
  var flrRow = getElementsByTagName('form', pCC)[0]
    .nextElementSibling.nextElementSibling.nextElementSibling;
  var folders = getArrayByTagName('img', flrRow).filter(otherFolders);
  if (folders.length === 0) {return;}
  insertHtmlAfterEnd(flrRow,
    '<tr><td class="fshCenter">Move selected items to: ' +
    '<select name="folder" id="selectFolderId" class="customselect">' +
    folders.map(makeOption).join('') +
    '</select>&nbsp;<input type="button" class="custombutton" ' +
    'id="fshMove" value="Move"></td></tr>'
  );
}

var invItems;
var itemId;

function guildTagged(o, el) {
  el.checked = !el.disabled && invItems[o.invid].guild_tag !== -1;
}

function tickElement(o, el) {
  el.checked = !el.disabled && !el.checked;
}

function allOfType(o, el) {
  if (invItems[o.invid] && invItems[o.invid].item_id === itemId) {
    tickElement(o, el);
  }
}

var types = [
  ['guild', guildTagged],
  ['item', allOfType],
  ['checkAll', tickElement]
];

function thisType(type, test) {return test[0] === type;}

function doCheck(how, o) {
  if (!o.injectHere) {return;}
  var tr = o.injectHere.parentNode;
  if (tr.classList.contains('fshHide')) {return;}
  var el = o.el.parentNode.parentNode.previousElementSibling.children[0];
  how(o, el);
}

function doCheckboxes(itemsAry, invItems_, type_, itemId_) {
  invItems = invItems_;
  var how = types.find(partial(thisType, type_))[1];
  itemId = Number(itemId_);
  itemsAry.forEach(partial(doCheck, how));
}

function extraButtons() {
  var tRows = getElementsByTagName(def_table, pCC)[0].rows;
  insertHtmlAfterBegin(tRows[tRows.length - 2].cells[0],
    '<input id="fshChkAll" value="Check All" type="button">&nbsp;');
}

function doFolderButtons(folders) {
  if (calf.subcmd2 === 'storeitems') {
    var formNode = getElementsByTagName('form', pCC)[0];
    if (formNode) {
      var tr = createTr({className: 'fshCenter'});
      var insertHere = createTd({colSpan: 3});
      insertElement(tr, insertHere);
      insertElementBefore(tr, formNode);
      insertHere.innerHTML = makeFolderSpans(folders);
      extraButtons();
    }
  }
}

var insertHere;

function setInsertHere() {
  if (!insertHere) {
    var cltn = getElementsByTagName('form', pCC);
    if (cltn.length > 0) {
      insertHere = cltn[0].previousElementSibling.children[0];
    }
  }
}

function showHideLabel(pref) {
  if (pref) {return 'Hide';}
  return 'Show';
}

function doToggleButtons(showExtraLinks, showQuickDropLinks) {
  // Option toggle buttons for both screens
  setInsertHere();
  if (insertHere) {
    var inject = '[<span id="fshShowExtraLinks" class="sendLink">' +
      showHideLabel(showExtraLinks) + ' AH and UFSG links</span>]&nbsp;' +
      '[<span id="fshShowQuickDropLinks" class="sendLink">' +
      showHideLabel(showQuickDropLinks) + ' Quick Drop links</span>]&nbsp;';
    if (calf.subcmd2 === 'storeitems') {
      inject += '[<span id="fshSelectAllGuildLocked" class="sendLink">' +
        ' Select All Guild Locked</span>]&nbsp;';
    }
    insertHere.innerHTML = inject;
  }
}

function clearCheck(el) {
  el.parentNode.parentNode.previousElementSibling.children[0].checked = false;
}

function displayFolderItems(invItems, folderId, o) {
  var tr = o.injectHere.parentNode;
  var folder = invItems[o.invid].folder_id;
  var force = folderId !== 0 && folderId !== folder;
  if ([563116, 1963510].includes(playerId())) {
    console.log(folderId, folder, folderId !== folder); // eslint-disable-line no-console
  }
  toggleForce(tr, force);
  toggleForce(tr.nextElementSibling, force);
}

function updateList(invItems, folderId, o) {
  clearCheck(o.el);
  displayFolderItems(invItems, folderId, o);
}

function hideFolders(itemsAry, invItems, target) {
  if ([563116, 1963510].includes(playerId())) {
    console.log( // eslint-disable-line no-console
      'itemsAry.length',
      itemsAry.length,
      'entries(invItems).length',
      entries(invItems).length,
      itemsAry,
      invItems
    );
  }
  batch([
    2,
    3,
    itemsAry,
    0,
    partial(updateList, invItems, Number(target.dataset.folder))
  ]);
}

function checked(o) {
  if (!o.injectHere) {return;}
  return o.injectHere.previousElementSibling.previousElementSibling
    .children[0].checked;
}

const invid = (o) => o.invid;

function itemByInvId(invId, item) {
  return invId.toString() === item.invid;
}

function removeInvId(itemsAry, invId) {
  var o = itemsAry.find(partial(itemByInvId, invId));
  if (o) {
    var tr = o.injectHere.parentNode;
    tr.nextElementSibling.remove();
    tr.remove();
    o.el = null;
    o.invid = null;
    o.injectHere = null;
  }
}

function removeInvIds(itemsAry, json) {
  if (isArray(json.r)) {
    json.r.forEach(partial(removeInvId, itemsAry));
  }
}

function moveList(itemsAry, folderId, list) {
  daSendToFolder(folderId, list).then(partial(removeInvIds, itemsAry));
}

function moveItemsToFolder(itemsAry) { // jQuery.min
  var folderId = getElementById('selectFolderId').value;
  chunk(30, itemsAry.filter(checked).map(invid))
    .forEach(partial(moveList, itemsAry, folderId));
}

function anotherSpinner(target) {
  target.innerHTML = '<img class="quickActionSpinner" src="' +
    cdn +
    'ui/misc/spinner.gif" width="15" height="15">';
}

function actionReturn(target, success, data) {
  if (data.r === 1) {return;}
  target.style.color = 'green';
  target.innerHTML = success;
}

function doAction(target, fn, success) {
  var itemInvId = target.getAttribute('itemInvId');
  fn([itemInvId]).then(partial(actionReturn, target, success));
}

function disableOtherButton(theTd, otherClass) {
  var otherButton = querySelector(otherClass, theTd);
  if (otherButton) {
    otherButton.className = 'quickAction';
    otherButton.innerHTML = '';
  }
}

function disableCheckbox(theTd) {
  var checkbox = theTd.parentNode.children[0].children[0];
  checkbox.checked = false;
  checkbox.disabled = true;
}

function quickAction(fn, success, otherClass, target) {
  target.className = 'quickAction';
  doAction(target, fn, success);
  hideQTip(target);
  anotherSpinner(target);
  var theTd = target.parentNode;
  disableOtherButton(theTd, otherClass);
  disableCheckbox(theTd);
}

var disableItemColoring;
var showExtraLinks;
var showQuickDropLinks;
var showQuickSendLinks;

function setShowExtraLinks() {
  showExtraLinks = !showExtraLinks;
  setValue('showExtraLinks', showExtraLinks);
}

function setShowQuickDropLinks() {
  showQuickDropLinks = !showQuickDropLinks;
  setValue('showQuickDropLinks', showQuickDropLinks);
}

function getPrefs() {
  disableItemColoring = getValue('disableItemColoring');
  showExtraLinks = getValue('showExtraLinks');
  showQuickDropLinks = getValue('showQuickDropLinks');
  showQuickSendLinks = getValue('showQuickSendLinks');
}

var itemsAry;
var itemsHash;

function getItemImg() {
  var allTables = getElementsByTagName(def_table, pCC);
  var lastTable = allTables[allTables.length - 1];
  return getArrayByTagName('img', lastTable);
}

function hasTip(el) {return el.dataset.tipped;}

function getIds(el) {
  var matches = el.dataset.tipped.match(itemRE);
  return [
    el,
    matches[1],
    matches[2]
  ];
}

function tally(prev, curr) {
  prev[curr[1]] = (prev[curr[1]] || 0) + 1;
  return prev;
}

function getInjector(ary) {
  return {
    el: ary[0],
    invid: ary[2],
    injectHere: ary[0].parentNode.parentNode.nextElementSibling
  };
}

function getItems() {
  addStatTotalToMouseover();
  getPrefs();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  var imgList = getItemImg();
  var fromTips = imgList.filter(hasTip).map(getIds);
  itemsAry = fromTips.map(getInjector);
  itemsHash = fromTips.reduce(tally, {});
  // Exclude composed pots
  itemsHash[13699] = 1;
}

var extraLinks;
var checkAll;
var dropLinks;
var invItems$1;
var colouring;
var sendLinks;

function afterbegin(o, item) {
  if (fallback(extraLinks, !showExtraLinks)) {return;}
  var pattern = '<span><span class="aHLink">';
  if (!item.bound) {
    pattern += '[<a href="' + ahSearchUrl +
      encodeURIComponent(item.item_name) + '">AH</a>]';
  }
  pattern += '</span>[<a href="' + guideUrl + 'items' + def_subcmd +
    'view&item_id=' + item.item_id + '" target="_blank">UFSG</a>]</span>';
  insertHtmlAfterBegin(o.injectHere, pattern);
}

function itemColouring(o, item) {
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(rarity[item.rarity].clas);
  }
}

var buildTrailer = [
  [
    function(item) {return !checkAll && itemsHash[item.item_id] !== 1;},
    function(o, item) {
      return ' [<span linkto="' + item.item_id +
        '" class="fshLink">Check all</span>]';
    }
  ],
  [
    function(item) {return !sendLinks && showQuickSendLinks && !item.bound;},
    function(o) {
      return ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
    }
  ],
  [
    function(item) {
      return !dropLinks && showQuickDropLinks && item.guild_tag === -1;
    },
    function(o) {
      return ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
    }
  ]
];

function condition(item, pair) {return pair[0](item);}

function generateHtml(o, item, pair) {return pair[1](o, item);}

function beforeend(o, item) {
  itemColouring(o, item);
  var pattern = buildTrailer.filter(partial(condition, item))
    .map(partial(generateHtml, o, item)).join('');
  if (pattern !== '') {insertHtmlBeforeEnd(o.injectHere, pattern);}
}

function itemWidgets(o) {
  var item = invItems$1[o.invid];
  if (item) { // Why does this happen?
    afterbegin(o, item);
    beforeend(o, item);
  }
}

function doneInvPaint() {
  if (showExtraLinks) {extraLinks = true;}
  checkAll = true;
  colouring = true;
  if (showQuickDropLinks) {dropLinks = true;}
  sendLinks = true;
}

function toggleExtraLinks(o) {
  toggleForce(o.injectHere.children[0], !showExtraLinks);
}

function toggleShowExtraLinks() {
  setShowExtraLinks();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!extraLinks) {
    batch([5, 3, itemsAry, 0, itemWidgets, doneInvPaint]);
  } else {
    itemsAry.forEach(toggleExtraLinks);
  }
}

function toggleDropLinks(o) {
  toggleForce(querySelector('.dropLink', o.injectHere), !showQuickDropLinks);
}

function toggleShowQuickDropLinks() {
  setShowQuickDropLinks();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!dropLinks) {
    batch([5, 3, itemsAry, 0, itemWidgets, doneInvPaint]);
  } else {
    itemsAry.forEach(toggleDropLinks);
  }
}

function doCheckboxesByType(type, itemId) {
  doCheckboxes(itemsAry, invItems$1, type, itemId);
}

function selfIds() {
  return [
    [selfIdIs('fshShowExtraLinks'), toggleShowExtraLinks],
    [selfIdIs('fshShowQuickDropLinks'), toggleShowQuickDropLinks],
    [selfIdIs('fshSelectAllGuildLocked'),
      partial(doCheckboxesByType, 'guild', null)],
    [selfIdIs('fshMove'), partial(moveItemsToFolder, itemsAry)],
    [selfIdIs('fshChkAll'), partial(doCheckboxesByType, 'checkAll', null)]
  ];
}

function evts() {
  return selfIds().concat([
    [
      function(target) {return target.hasAttribute('linkto');},
      function(target) {
        doCheckboxesByType('item', target.getAttribute('linkto'));
      }
    ],
    [partial(hasClass, 'sendLink'),
      partial(quickAction, ajaxSendItems, 'Sent', '.dropLink')],
    [partial(hasClass, 'dropLink'),
      partial(quickAction, dropItem, 'Dropped', '.sendLink')],
    [partial(hasClass, 'fshFolder'), partial(hideFolders, itemsAry, invItems$1)]
  ]);
}

function badData(data) {
  return !data || !data.items || !data.folders;
}

function inventory(data) {
  if (badData(data) || !itemsAry) {return;}
  extraLinks = false;
  checkAll = false;
  invItems$1 = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  batch([5, 3, itemsAry, 0, itemWidgets, doneInvPaint]);
  doFolderButtons(data.folders);
  onclick(pCC, eventHandler5(evts()));
}

function injectStoreItems() {
  if (jQueryNotPresent()) {return;}
  getInventoryById().then(inventory); // change this?
  add(3, getItems);
}

function injectProfileDropItems() {
  injectStoreItems();
  if (calf.subcmd === 'dropitems') {injectMoveItems();}
}

export default injectProfileDropItems;
//# sourceMappingURL=injectProfileDropItems-c50a3886.js.map
