import add from '../support/task';
import addStatTotalToMouseover from '../common/addStatTotalToMouseover';
import doCheckboxes from './doCheckboxes';
import doFolderButtons from './doFolderButtons';
import doToggleButtons from './doToggleButtons';
import dropItem from '../ajax/dropItem';
import getInventoryById from '../ajax/getInventoryById';
import hideFolders from './hideFolders';
import injectMoveItems from './injectMoveItems';
import moveItemsToFolder from './moveItemsToFolder';
import quickAction from './quickAction';
import sendItem from '../ajax/sendItem';
import * as dataObj from '../support/dataObj';
import * as layout from '../support/layout';
import * as system from '../support/system';

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

function afterbegin(o, item) {
  if (system.fallback(extraLinks, !showExtraLinks)) {
    return;
  }
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

var buildTrailer = [
  {
    condition: function(item) {
      return !checkAll && itemsHash[item.item_id] !== 1;
    },
    result: function(o, item) {
      return ' [<span linkto="' + item.item_id +
        '" class="fshLink">Check all</span>]';
    }
  },
  {
    condition: function(item) {
      return !sendLinks && showQuickSendLinks &&
        !item.bound;
    },
    result: function(o) {
      return ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
    }
  },
  {
    condition: function(item) {
      return !dropLinks && showQuickDropLinks &&
        item.guild_tag === '-1';
    },
    result: function(o) {
      return ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
    }
  }
];

function beforeend(o, item) {
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(dataObj.rarity[item.rarity].clas);
  }
  var pattern = buildTrailer.reduce(function(prev, el) {
    var ret = prev;
    if (el.condition(item)) {
      ret += el.result(o, item);
    }
    return ret;
  }, '');
  if (pattern !== '') {o.injectHere.insertAdjacentHTML('beforeend', pattern);}
}

function doneInvPaint() {
  if (showExtraLinks) {extraLinks = true;}
  checkAll = true;
  colouring = true;
  if (showQuickDropLinks) {dropLinks = true;}
  sendLinks = true;
}

function invPaint() { // Native - abstract this pattern
  var limit = performance.now() + 5;
  while (performance.now() < limit &&
      paintCount < itemsAry.length) {
    var o = itemsAry[paintCount];
    var item = invItems[o.invid];
    afterbegin(o, item);
    beforeend(o, item);
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    add(3, invPaint);
  } else {
    doneInvPaint();
  }
}

function toggleShowExtraLinks() {
  showExtraLinks = !showExtraLinks;
  system.setValue('showExtraLinks', showExtraLinks);
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!extraLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      el.classList.toggle('fshHide');
    });
  }
}

function toggleShowQuickDropLinks() {
  showQuickDropLinks = !showQuickDropLinks;
  system.setValue('showQuickDropLinks', showQuickDropLinks);
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!dropLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.querySelector('.dropLink');
      el.classList.toggle('fshHide');
    });
  }
}

var evts = [
  {
    condition: function(self) {return self.id === 'fshShowExtraLinks';},
    result: toggleShowExtraLinks
  },
  {
    condition: function(self) {return self.id === 'fshShowQuickDropLinks';},
    result: toggleShowQuickDropLinks
  },
  {
    condition: function(self) {return self.id === 'fshSelectAllGuildLocked';},
    result: function() {doCheckboxes(itemsAry, invItems, 'guild');}
  },
  {
    condition: function(self) {return self.id === 'fshMove';},
    result: function() {moveItemsToFolder(itemsAry);}
  },
  {
    condition: function(self) {return self.hasAttribute('linkto');},
    result: function(self) {
      doCheckboxes(itemsAry, invItems, 'item', self.getAttribute('linkto'));
    }
  },
  {
    condition: function(self) {return self.classList.contains('sendLink');},
    result: function(self) {
      quickAction(self, sendItem, 'Sent', '.dropLink');
    }
  },
  {
    condition: function(self) {return self.classList.contains('dropLink');},
    result: function(self) {
      quickAction(self, dropItem, 'Dropped', '.sendLink');
    }
  },
  {
    condition: function(self) {return self.classList.contains('folder');},
    result: function(self) {
      hideFolders(itemsAry, invItems, self);
    }
  },
  {
    condition: function(self) {return self.value === 'Check All';},
    result: function() {
      doCheckboxes(itemsAry, invItems, 'checkAll');
    }
  }
];

function evtHandler(evt) {
  var self = evt.target;
  evts.some(function(el) {
    if (el.condition(self)) {
      el.result(self);
      return true;
    }
    return false;
  });
}

function getItems() {
  addStatTotalToMouseover();
  disableItemColoring = system.getValue('disableItemColoring');
  showExtraLinks = system.getValue('showExtraLinks');
  showQuickDropLinks = system.getValue('showQuickDropLinks');
  showQuickSendLinks = system.getValue('showQuickSendLinks');
  doToggleButtons(showExtraLinks, showQuickDropLinks);
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
  // Exclude composed pots
  itemsHash[13699] = 1;
}

function inventory(data) {
  extraLinks = false;
  checkAll = false;
  invItems = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  paintCount = 0;
  add(3, invPaint);
  doFolderButtons(data.folders);
}

export function injectStoreItems() {
  getInventoryById().done(inventory);
  add(3, getItems);
}

export function injectProfileDropItems() {
  injectStoreItems();
  injectMoveItems();
}
