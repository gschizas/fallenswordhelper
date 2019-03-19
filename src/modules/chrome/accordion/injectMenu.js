import actionButtons from './actionButtons';
import adjustHeight from './adjustHeight';
import characterButtons from './characterButtons';
import currentGuildId from '../../common/currentGuildId';
import executeAll from '../../common/executeAll';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import insertAfterParent from './insertAfterParent';
import insertHtmlAfterEnd from '../../common/insertHtmlAfterEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import navMenu from './navMenu';
import {pCL} from '../../support/layout';
import preFlight from './preFlight';
import {
  cmdUrl,
  def_subcmd,
  newGuildLogUrl,
  notepadBlankUrl
} from '../../support/constants';

function updateQuestLink() {
  var lastActiveQuestPage = getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    getElementById('nav-character-questbook').href = lastActiveQuestPage;
  }
}

function updateScavLink() {
  var lastScavPage = getValue('lastScavPage');
  if (lastScavPage.length > 0) {
    getElementById('nav-actions-artisanship-scavenging').href = lastScavPage;
  }
}

function guildInventory() {
  if (currentGuildId()) {
    insertAfterParent('nav-guild-storehouse-inventory', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="' + notepadBlankUrl +
      'guildinvmgr">Guild Inventory</a></li>');
  }
}

function newGuildLogLink() {
  if (currentGuildId() && !getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    insertAfterParent('nav-guild-ledger-advisor', insertHtmlAfterEnd,
      '<li class="nav-level-2"><a class="nav-link" ' +
      'href="' + newGuildLogUrl + '"' +
      '>New Guild Log</a></li>');
  }
}

function topRatedLink() {
  insertAfterParent('nav-toprated-players-level', insertHtmlAfterEnd,
    '<li class="nav-level-2"><a class="nav-link" id="nav-' +
    'toprated-top250" href="' + cmdUrl + 'toprated' + def_subcmd +
    'xp">Top 250 Players</a></li>');
}

function injectItems() {
  executeAll([
    updateQuestLink,
    updateScavLink,
    characterButtons,
    guildInventory,
    newGuildLogLink,
    topRatedLink,
    actionButtons
  ]);
}

function doAccordion() {
  const [theNav, myNav] = preFlight();
  if (theNav && myNav) {
    injectItems();
    adjustHeight(theNav, myNav);
    navMenu(myNav);
  }
}

export default function injectMenu() {
  if (!pCL || jQueryNotPresent()) {return;}
  doAccordion();
}
