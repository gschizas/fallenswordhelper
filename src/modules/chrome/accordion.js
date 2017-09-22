import injectBuffLog from '../buffLog/injectBuffLog';
import injectMonsterLog from '../monstorLog';
import injectNotepadShowLogs from '../combatLog';
import injectOnlinePlayers from '../onlinePlayers';
import injectRecipeManager from '../recipeMgr/recipeMgr';
import jQueryDialog from './jQueryDialog';
import {createLi, createSpan} from '../common/cElement';
import {injectAuctionSearch, injectQuickLinkManager} from '../lists';
import {injectFindBuffs, injectFindOther} from '../findBuffs';
import * as system from '../support/system';

function updateQuestLink() {
  var lastActiveQuestPage = system.getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    document.getElementById('nav-character-questbook')
      .setAttribute('href', lastActiveQuestPage);
  }
}

function spanButton(navLvl, text, fn, target) {
  var li = createLi({className: 'nav-level-' + navLvl});
  var sb = createSpan({
    className: 'nav-link fshPoint',
    textContent: text
  });
  sb.addEventListener('click', function() {
    jQueryDialog(fn);
  });
  li.appendChild(sb);
  document.getElementById(target).parentNode
    .insertAdjacentElement('afterend', li);
}

function buffLogLink() {
  if (system.getValue('keepBuffLog')) {
    spanButton('1', 'Buff Log', injectBuffLog, 'nav-character-log');
  }
}

function combatLogLink() {
  if (system.getValue('keepLogs')) {
    spanButton('1', 'Combat Logs', injectNotepadShowLogs,
      'nav-character-notepad');
  }
}

function creatureLogLink() {
  if (system.getValue('showMonsterLog')) {
    spanButton('1', 'Creature Logs', injectMonsterLog,
      'nav-character-notepad');
  }
}

function newGuildLogLink() {
  if (!system.getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    document.getElementById('nav-guild-ledger-guildlog').parentNode
      .insertAdjacentHTML('beforebegin',
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php?cmd=notepad&blank=1&subcmd=newguildlog"' +
        '>New Guild Log</a></li>');
  }
}

function adjustHeight() { // jQuery
  // adjust the menu height for the newly added items
  var theNav = document.getElementById('nav');
  var myNav = $(theNav).data('nav');
  // first the closed saved variables
  myNav.heights = [
    null,
    null,
    // Character
    document.getElementById('nav-character').nextElementSibling.children
      .length * 22,
    660,
    // Guild
    document.querySelectorAll('#nav-guild > ul li').length * 22,
    374,
    132,
    132,
    null
  ];
  if (myNav.state !== '-1' && myNav.state !== -1) {
    // and now the open one
    theNav.children[myNav.state].children[1].style.height =
      myNav.heights[myNav.state] + 'px';
  }
}

export default function injectMenu() {
  if (!document.getElementById('pCL')) {return;}
  updateQuestLink();
  // character
  spanButton('1', 'Recipe Manager', injectRecipeManager, 'nav-character-log');
  document.getElementById('nav-character-log').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-medalguide" href="index.php?cmd=profile&subcmd=' +
      'medalguide">Medal Guide</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=invmanagernew">Inventory Manager</a></li>');
  buffLogLink();
  combatLogLink();
  creatureLogLink();
  spanButton('1', 'Quick Links', injectQuickLinkManager,
    'nav-character-notepad');
  // guild
  document.getElementById('nav-guild-storehouse-inventory').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=guildinvmgr">Guild Inventory</a></li>');
  newGuildLogLink();
  // top rated
  document.getElementById('nav-toprated-players-level').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
  // actions
  spanButton('2', 'AH Quick Search', injectAuctionSearch,
    'nav-actions-trade-auctionhouse');
  spanButton('2', 'Online Players', injectOnlinePlayers,
    'nav-actions-interaction-findplayer');
  spanButton('2', 'Find Other', injectFindOther,
    'nav-actions-interaction-findplayer');
  spanButton('2', 'Find Buffs', injectFindBuffs,
    'nav-actions-interaction-findplayer');
  adjustHeight();
}
