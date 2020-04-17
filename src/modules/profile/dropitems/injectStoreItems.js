import './injectStoreItems.css';
import add from '../../support/task';
import ajaxSendItems from '../../ajax/ajaxSendItems';
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
import onclick from '../../common/onclick';
import { pCC } from '../../support/layout';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import quickAction from './quickAction';
import selfIdIs from '../../common/selfIdIs';
import { sendException } from '../../support/fshGa';
import toggleForce from '../../common/toggleForce';
import {
  ahSearchUrl,
  defSubcmd,
  guideUrl,
  rarity,
} from '../../support/constants';
import {
  disableItemColoring,
  setShowExtraLinks,
  setShowQuickDropLinks,
  showExtraLinks,
  showQuickDropLinks,
  showQuickSendLinks,
} from './getPrefs';
import { getItems, itemsAry, itemsHash } from './getItems';

let extraLinks;
let checkAll;
let dropLinks;
let invItems;
let colouring;
let sendLinks;

function afterbegin(o, item) {
  if (fallback(extraLinks, !showExtraLinks)) { return; }
  let pattern = '<span><span class="aHLink">';
  if (!item.bound) {
    pattern += `[<a href="${ahSearchUrl
    }${encodeURIComponent(item.item_name)}">AH</a>]`;
  }
  pattern += `</span>[<a href="${guideUrl}items${defSubcmd
  }view&item_id=${item.item_id}" target="_blank">UFSG</a>]</span>`;
  insertHtmlAfterBegin(o.injectHere, pattern);
}

function itemColouring(o, item) {
  if (!colouring && !disableItemColoring) {
    o.injectHere.classList.add(rarity[item.rarity].clas);
  }
}

const buildTrailer = [
  [
    (item) => !checkAll && itemsHash[item.item_id] !== 1,
    (o, item) => ` [<span linkto="${
      item.item_id}" class="fshLink">Check all</span>]`,
  ],
  [
    (item) => !sendLinks && showQuickSendLinks && !item.bound,
    (o) => ` <span class="quickAction sendLink tip-static" itemInvId="${
      o.invid}" data-tipped="INSTANTLY SENDS THE ITEM. `
      + 'NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>',
  ],
  [
    (item) => !dropLinks && showQuickDropLinks && item.guild_tag === -1,
    (o) => ` <span class="quickAction dropLink tip-static" itemInvId="${
      o.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS `
      + 'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>',
  ],
];

function condition(item, pair) { return pair[0](item); }

function generateHtml(o, item, pair) { return pair[1](o, item); }

function beforeend(o, item) {
  itemColouring(o, item);
  const pattern = buildTrailer.filter(partial(condition, item))
    .map(partial(generateHtml, o, item)).join('');
  if (pattern !== '') { insertHtmlBeforeEnd(o.injectHere, pattern); }
}

function itemWidgets(o) {
  const item = invItems[o.invid];
  if (item) {
    afterbegin(o, item);
    beforeend(o, item);
  } else {
    sendException('injectStoreItems: Item not found', false);
  }
}

function doneInvPaint() {
  if (showExtraLinks) { extraLinks = true; }
  checkAll = true;
  colouring = true;
  if (showQuickDropLinks) { dropLinks = true; }
  sendLinks = true;
}

function toggleExtraLinks(o) {
  if (o.injectHere) {
    toggleForce(o.injectHere.children[0], !showExtraLinks);
  }
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
  doCheckboxes(itemsAry, invItems, type, itemId);
}

function selfIds() {
  return [
    [selfIdIs('fshShowExtraLinks'), toggleShowExtraLinks],
    [selfIdIs('fshShowQuickDropLinks'), toggleShowQuickDropLinks],
    [selfIdIs('fshSelectAllGuildLocked'),
      partial(doCheckboxesByType, 'guild', null)],
    [selfIdIs('fshMove'), partial(moveItemsToFolder, itemsAry)],
    [selfIdIs('fshChkAll'), partial(doCheckboxesByType, 'checkAll', null)],
  ];
}

function evts() {
  return selfIds().concat([
    [
      (target) => target.hasAttribute('linkto'),
      (target) => {
        doCheckboxesByType('item', target.getAttribute('linkto'));
      },
    ],
    [partial(hasClass, 'sendLink'),
      partial(quickAction, ajaxSendItems, 'Sent', '.dropLink')],
    [partial(hasClass, 'dropLink'),
      partial(quickAction, dropItem, 'Dropped', '.sendLink')],
    [partial(hasClass, 'fshFolder'), partial(hideFolders, itemsAry, invItems)],
  ]);
}

function badData(data) {
  return !data || !data.items || !data.folders;
}

function inventory(data) {
  if (badData(data) || !itemsAry) { return; }
  extraLinks = false;
  checkAll = false;
  invItems = data.items;
  colouring = false;
  dropLinks = false;
  sendLinks = false;
  batch([5, 3, itemsAry, 0, itemWidgets, doneInvPaint]);
  doFolderButtons(data.folders);
  onclick(pCC, eventHandler5(evts()));
}

export default function injectStoreItems() {
  if (jQueryNotPresent()) { return; }
  getInventoryById().then(inventory);
  add(3, getItems);
}
