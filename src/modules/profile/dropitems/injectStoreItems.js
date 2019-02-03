import add from '../../support/task';
import batch from '../../common/batch';
import doCheckboxes from './doCheckboxes';
import doFolderButtons from './doFolderButtons';
import doToggleButtons from './doToggleButtons';
import dropItem from '../../ajax/dropItem';
import eventHandler5 from '../../common/eventHandler5';
import fallback from '../../system/fallback';
import getInventoryById from '../../ajax/getInventoryById';
import hasClass from '../../common/hasClass';
import hideFolders from './hideFolders';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import moveItemsToFolder from './moveItemsToFolder';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import quickAction from './quickAction';
import senditems from '../../app/trade/senditems';
import toggleForce from '../../common/toggleForce';
import {
  ahSearchUrl,
  def_subcmd,
  guideUrl,
  rarity
} from '../../support/constants';
import {
  disableItemColoring,
  setShowExtraLinks,
  setShowQuickDropLinks,
  showExtraLinks,
  showQuickDropLinks,
  showQuickSendLinks
} from './getPrefs';
import {getItems, itemsAry, itemsHash} from './getItems';

var extraLinks;
var checkAll;
var dropLinks;
var invItems;
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
  var item = invItems[o.invid];
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

function toggleExtraLinks(o) {
  toggleForce(o.injectHere.children[0], !showExtraLinks);
}

function toggleShowExtraLinks() {
  setShowExtraLinks();
  doToggleButtons(showExtraLinks, showQuickDropLinks);
  if (!extraLinks) {
    batch(3, itemsAry, 0, itemWidgets, doneInvPaint);
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
    batch(3, itemsAry, 0, itemWidgets, doneInvPaint);
  } else {
    itemsAry.forEach(toggleDropLinks);
  }
}

var evts = [
  [
    function(self) {return self.id === 'fshShowExtraLinks';},
    toggleShowExtraLinks
  ],
  [
    function(self) {return self.id === 'fshShowQuickDropLinks';},
    toggleShowQuickDropLinks
  ],
  [
    function(self) {return self.id === 'fshSelectAllGuildLocked';},
    function() {doCheckboxes(itemsAry, invItems, 'guild');}
  ],
  [
    function(self) {return self.id === 'fshMove';},
    function() {moveItemsToFolder(itemsAry);}
  ],
  [
    function(self) {return self.hasAttribute('linkto');},
    function(self) {
      doCheckboxes(itemsAry, invItems, 'item', self.getAttribute('linkto'));
    }
  ],
  [
    function(self) {return hasClass('sendLink', self);},
    function(self) {quickAction(self, senditems, 'Sent', '.dropLink');}
  ],
  [
    function(self) {return hasClass('dropLink', self);},
    function(self) {quickAction(self, dropItem, 'Dropped', '.sendLink');}
  ],
  [
    function(self) {return hasClass('fshFolder', self);},
    function(self) {hideFolders(itemsAry, invItems, self);}
  ],
  [
    function(self) {return self.id === 'fshChkAll';},
    function() {doCheckboxes(itemsAry, invItems, 'checkAll');}
  ]
];

function badData(data) {
  return !data || !data.items || !data.folders;
}

function inventory(data) {
  if (badData(data) || !itemsAry) {return;}
  extraLinks = false;
  checkAll = false;
  invItems = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  batch(3, itemsAry, 0, itemWidgets, doneInvPaint);
  doFolderButtons(data.folders);
  on(pCC, 'click', eventHandler5(evts));
}

export default function injectStoreItems() {
  if (jQueryNotPresent()) {return;}
  getInventoryById().done(inventory);
  add(3, getItems);
}
