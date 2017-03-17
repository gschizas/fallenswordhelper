import * as system from '../support/system';

export function injectMenu() { // jQuery.min
  if (!document.getElementById('pCL')) {return;}
  var lastActiveQuestPage = system.getValue('lastActiveQuestPage');
  if (lastActiveQuestPage.length > 0) {
    document.querySelector('#pCL a[href="index.php?cmd=questbook"]')
      .setAttribute('href', lastActiveQuestPage);
  }
  // character
  document.getElementById('nav-character-log').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-medalguide" href="index.php?cmd=profile&subcmd=' +
      'medalguide">Medal Guide</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-invmanager" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=invmanagernew">Inventory Manager</a></li>' +
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-recipemanager" href="index.php?cmd=notepad&blank' +
      '=1&subcmd=recipemanager">Recipe Manager</a></li>');
  if (system.getValue('keepBuffLog')) {
    document.getElementById('nav-character-log').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-bufflog" href="index.php?cmd=notepad&blank=1&' +
        'subcmd=bufflogcontent">Buff Log</a></li>');
  }
  if (system.getValue('keepLogs')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-showlogs" href="index.php?cmd=notepad&blank=1' +
        '&subcmd=showlogs">Combat Logs</a></li>');
  }
  if (system.getValue('showMonsterLog')) {
    document.getElementById('nav-character-notepad').parentNode
      .insertAdjacentHTML('afterend',
        '<li class="nav-level-1"><a class="nav-link" id="nav-' +
        'character-monsterlog" href="index.php?cmd=notepad&blank' +
        '=1&subcmd=monsterlog">Creature Logs</a></li>');
  }
  document.getElementById('nav-character-notepad').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-1"><a class="nav-link" id="nav-' +
      'character-quicklinkmanager" href="index.php?cmd=notepad&' +
      'blank=1&subcmd=quicklinkmanager">Quick Links</a></li>');
  // guild
  document.getElementById('nav-guild-storehouse-inventory').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=guildinvmgr">Guild Inventory</a></li>');
  if (!system.getValue('useNewGuildLog')) {
    // if not using the new guild log, show it as a separate menu entry
    document.getElementById('nav-guild-ledger-guildlog').parentNode
      .insertAdjacentHTML('beforebegin',
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php?cmd=notepad&blank=1&subcmd=newguildlog"' +
        '>New Guild Log</a></li>');
  }
  // top rated
  document.getElementById('nav-toprated-players-level').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
  // actions
  document.getElementById('nav-actions-trade-auctionhouse').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-ahquicksearch" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=auctionsearch">AH Quick Search</a></li>');
  document.getElementById('nav-actions-interaction-findplayer').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-findbuffs" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=findbuffs">Find Buffs</a></li>' +
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-findother" href="index.php?cmd=notepad&blank=1&' +
      'subcmd=findother">Find Other</a></li>' +
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'actions-onlineplayers" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=onlineplayers">Online Players</a></li>');
  // adjust the menu height for the newly added items
  var theNav = document.getElementById('nav');
  var myNav = $(theNav).data('nav');
  // first the closed saved variables
  myNav.heights = [null, null,
    // Character
    document.getElementById('nav-character').nextElementSibling.children
      .length * 22,
    660,
    // Guild
    document.querySelectorAll('#nav-guild > ul li').length * 22,
    374, 132, 132, null];
  if (myNav.state !== '-1' && myNav.state !== -1) {
    // and now the open one
    theNav.children[myNav.state].children[1].style.height =
      myNav.heights[myNav.state] + 'px';
  }
}
