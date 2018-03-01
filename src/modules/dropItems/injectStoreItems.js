import add from '../support/task';
import doCheckboxes from './doCheckboxes';
import doFolderButtons from './doFolderButtons';
import doToggleButtons from './doToggleButtons';
import dropItem from '../ajax/dropItem';
import eventHandler from '../common/eventHandler';
import fallback from '../system/fallback';
import getInventoryById from '../ajax/getInventoryById';
import hideFolders from './hideFolders';
import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import moreToDo from '../common/moreToDo';
import moveItemsToFolder from './moveItemsToFolder';
import {pCC} from '../support/layout';
import quickAction from './quickAction';
import sendItem from '../ajax/sendItem';
import toggleForce from '../common/toggleForce';
import {
  disableItemColoring,
  setShowExtraLinks,
  setShowQuickDropLinks,
  showExtraLinks,
  showQuickDropLinks,
  showQuickSendLinks
} from './getPrefs';
import {getItems, itemsAry, itemsHash} from './getItems';
import {guideUrl, rarity} from '../support/constants';

var extraLinks;
var paintCount;
var checkAll;
var dropLinks;
var invItems;
var colouring;
var sendLinks;

function afterbegin(o, item) {
  if (fallback(extraLinks, !showExtraLinks)) {return;}
  var pattern = '<span><span class="aHLink">';
  if (!item.bound) {
    pattern += '[<a href="index.php?cmd=auctionhouse&search=' +
      encodeURIComponent(item.item_name) + '">AH</a>]';
  }
  pattern += '</span>[<a href="' + guideUrl + 'items&subcmd=view&item_id=' +
    item.item_id + '" target="_blank">UFSG</a>]</span>';
  insertHtmlAfterBegin(o.injectHere, pattern);
}

function itemColouring(o, item) {
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(rarity[item.rarity].clas);
  }
}

var buildTrailer = [
  {
    test: function(item) {return !checkAll && itemsHash[item.item_id] !== 1;},
    act: function(o, item) {
      return ' [<span linkto="' + item.item_id +
        '" class="fshLink">Check all</span>]';
    }
  },
  {
    test: function(item) {
      return !sendLinks && showQuickSendLinks && !item.bound;
    },
    act: function(o) {
      return ' <span class="quickAction sendLink tip-static" ' +
        'itemInvId="' + o.invid + '" data-tipped="INSTANTLY SENDS THE ' +
        'ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>';
    }
  },
  {
    test: function(item) {
      return !dropLinks && showQuickDropLinks && item.guild_tag === -1;
    },
    act: function(o) {
      return ' <span class="quickAction dropLink tip-static" itemInvId="' +
        o.invid + '" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS ' +
        'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>';
    }
  }
];

function beforeend(o, item) {
  itemColouring(o, item);
  var pattern = buildTrailer.reduce(function(prev, el) {
    var ret = prev;
    if (el.test(item)) {
      ret += el.act(o, item);
    }
    return ret;
  }, '');
  if (pattern !== '') {insertHtmlBeforeEnd(o.injectHere, pattern);}
}

function itemWidgets(o, item) {
  if (item) {
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

function invPaint() { // Native - abstract this pattern
  var limit = performance.now() + 5;
  while (moreToDo(limit, paintCount, itemsAry)) {
    var o = itemsAry[paintCount];
    var item = invItems[o.invid];
    itemWidgets(o, item);
    paintCount += 1;
  }
  if (paintCount < itemsAry.length) {
    add(3, invPaint);
  } else {
    doneInvPaint();
  }
}

function toggleShowExtraLinks() {
  setShowExtraLinks();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!extraLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.firstElementChild;
      toggleForce(el, !showExtraLinks);
    });
  }
}

function toggleShowQuickDropLinks() {
  setShowQuickDropLinks();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!dropLinks) {
    paintCount = 0;
    add(3, invPaint);
  } else {
    itemsAry.forEach(function(o) {
      var el = o.injectHere.querySelector('.dropLink');
      toggleForce(el, !showQuickDropLinks);
    });
  }
}

var evts = [
  {
    test: function(self) {return self.id === 'fshShowExtraLinks';},
    act: toggleShowExtraLinks
  },
  {
    test: function(self) {return self.id === 'fshShowQuickDropLinks';},
    act: toggleShowQuickDropLinks
  },
  {
    test: function(self) {return self.id === 'fshSelectAllGuildLocked';},
    act: function() {doCheckboxes(itemsAry, invItems, 'guild');}
  },
  {
    test: function(self) {return self.id === 'fshMove';},
    act: function() {moveItemsToFolder(itemsAry);}
  },
  {
    test: function(self) {return self.hasAttribute('linkto');},
    act: function(self) {
      doCheckboxes(itemsAry, invItems, 'item', self.getAttribute('linkto'));
    }
  },
  {
    test: function(self) {return self.classList.contains('sendLink');},
    act: function(self) {quickAction(self, sendItem, 'Sent', '.dropLink');}
  },
  {
    test: function(self) {return self.classList.contains('dropLink');},
    act: function(self) {quickAction(self, dropItem, 'Dropped', '.sendLink');}
  },
  {
    test: function(self) {return self.classList.contains('fshFolder');},
    act: function(self) {hideFolders(itemsAry, invItems, self);}
  },
  {
    test: function(self) {return self.id === 'fshChkAll';},
    act: function() {doCheckboxes(itemsAry, invItems, 'checkAll');}
  }
];

function inventory(data) {
  if (!data) {return;}
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

export default function injectStoreItems() {
  if (jQueryNotPresent()) {return;}
  getInventoryById().done(inventory);
  add(3, getItems);
  pCC.addEventListener('click', eventHandler(evts));
}
