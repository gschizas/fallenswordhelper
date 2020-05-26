import actionButtons from './actionButtons';
import adjustHeight from './adjustHeight';
import characterButtons from './characterButtons';
import currentGuildId from '../../common/currentGuildId';
import executeAll from '../../common/executeAll';
import getElementById from '../../common/getElement';
import getValue from '../../system/getValue';
import insertAfterParent from './insertAfterParent';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import insertHtmlBeforeBegin from '../../common/insertHtmlBeforeBegin';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import navMenu from './navMenu';
import { pCL } from '../../support/layout';
import preFlight from './preFlight';
import {
  cmdUrl,
  defSubcmd,
  newGuildLogUrl,
  notepadBlankUrl,
} from '../../support/constants';

function updateQuestLink() {
  const lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (getValue('storeLastQuestPage') && lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  const lastScavPage = getValue('lastScavPage');
  if (getValue('storeLastScavPage') && lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function guildInventory() {
  if (getValue('guildInventoryLink') && currentGuildId()) {
    insertAfterParent('nav-guild-storehouse-inventory', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" '
      + `id="nav-guild-guildinvmanager" href="${
        notepadBlankUrl}guildinvmgr">Guild Inventory</a></li>`);
  }
}

function newGuildLogLink() {
  if (getValue('newGuildLogLink') && currentGuildId() && !getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    insertAfterParent('nav-guild-ledger-guildlog', insertHtmlBeforeBegin,
      `<li class="nav-level-2"><a class="nav-link" href="${
        newGuildLogUrl}">New Guild Log</a></li>`);
  }
}

function topRatedLink() {
  if (getValue('topRatedLink')) {
    insertAfterParent('nav-toprated-players-level', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" id="nav-toprated-top250" '
    + `href="${cmdUrl}toprated${defSubcmd}xp">Top 250 Players</a></li>`);
  }
}

function updateLinks() {
  updateQuestLink();
  updateScavLink();
}

function injectItems() {
  executeAll([
    characterButtons,
    actionButtons,
    guildInventory,
    newGuildLogLink,
    topRatedLink,
  ]);
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    updateLinks();
    injectItems();
    adjustHeight(theNav, myNav);
    navMenu(myNav);
  }
}

export default function injectMenu() {
  if (!pCL || jQueryNotPresent()) { return; }
  doAccordion();
}
