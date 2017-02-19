import calf from '../support/calf';
import * as task from '../support/task';
import * as fshGa from '../support/fshGa';
import * as system from '../support/system';
import * as ajax from '../support/ajax';
import * as composing from '../composing/composing';
import * as notification from '../notification';
import * as common from '../support/common';
import * as helperMenu from './helperMenu';
import * as allyEnemy from './allyEnemy';
import * as news from '../news';
import * as messaging from './messaging';
import * as activeWantedBounties from './activeWantedBounties';
import * as sendGold from '../newMap/sendGold';
import pageSwitcher from './pageSwitcher';

var coreFunction;
var functionPath;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
var expandMenuOnKeyPress;

function getCoreFunction() { // Native
  var cmd;
  var subcmd;
  var subcmd2;
  var type;
  var fromWorld;
  var test_cmd;
  if (document.location.search !== '') {
    cmd = system.getUrlParameter('cmd') || '-';
    subcmd = system.getUrlParameter('subcmd') || '-';
    subcmd2 = system.getUrlParameter('subcmd2') || '-';
    type = system.getUrlParameter('type') || '-';
    fromWorld = system.getUrlParameter('fromworld') || '-';
  } else {
    test_cmd = document.querySelector('input[name="cmd"]');
    cmd = test_cmd ? test_cmd.getAttribute('value') : '-';
    test_cmd = document.querySelector('input[name="subcmd"]');
    subcmd = test_cmd ? test_cmd.getAttribute('value') : '-';
    if (subcmd === 'dochat') {
      cmd = '-';
      subcmd = '-';
    }
    test_cmd = document.querySelector('input[name="subcmd2"]');
    subcmd2 = test_cmd ? test_cmd.getAttribute('value') : '-';
    type = '-';
    fromWorld = '-';
  }

//#if _DEV  // TODO patch for types that we don't care about
//#endif
  calf.cmd = cmd;
  calf.subcmd = subcmd;
  calf.subcmd2 = subcmd2;
  functionPath = cmd + '/' + subcmd + '/' + subcmd2 + '/' + type + '/' +
    fromWorld;

  if (pageSwitcher[cmd] &&
      pageSwitcher[cmd][subcmd] &&
      pageSwitcher[cmd][subcmd][subcmd2] &&
      pageSwitcher[cmd][subcmd][subcmd2][type] &&
      pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld]) {
    coreFunction = pageSwitcher[cmd][subcmd][subcmd2][type][fromWorld];
  }
}

function gameHelpLink() { // Native
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function movePage(dir) { // Legacy
  var dirButton = system.findNode('//input[@value="'+dir+'"]');
  if (!dirButton) {return;}
  var url = dirButton.getAttribute('onClick');
  url = url.replace(/^[^']*'/m, '').replace(/\';$/m, '');
  location.href = url;
}

function changeCombatSet(responseText, itemIndex) { // jQuery.min
  var doc = system.createDocument(responseText);

  var cbsSelect = doc.querySelector(
    '#profileCombatSetDiv select[name="combatSetId"]');

  // find the combat set id value
  var allItems = cbsSelect.getElementsByTagName('option');
  if (itemIndex >= allItems.length) {return;}
  var cbsIndex = allItems[itemIndex].value;

  $.ajax({
    url: 'index.php',
    data: {
      cmd: 'profile',
      subcmd: 'managecombatset',
      combatSetId: cbsIndex,
      submit: 'Use'
    },
    success: function() {
      if (expandMenuOnKeyPress) {
        localStorage.setItem('hcs.nav.openIndex', '2');
      }
      location.href = 'index.php?cmd=profile';
    }
  });
}

function keyPress(evt) { // Native

  if (evt.target.tagName !== 'HTML' &&
      evt.target.tagName !== 'BODY') {return;}

  // ignore control, alt and meta keys (I think meta is the command key in Macintoshes)
  if (evt.ctrlKey) {return;}
  if (evt.metaKey) {return;}
  if (evt.altKey) {return;}

  var r = evt.charCode;

  switch (r) {
  case 114: // repair [r]
    //do not use repair link for new map
    if (!document.getElementById('worldPage')) {
      location.href = 'index.php?cmd=blacksmith&subcmd=repairall&fromworld=1';
    }
    break;
  case 71: // create group [G]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href =
      'index.php?cmd=guild&subcmd=groups&subcmd2=create&fromworld=1';
    break;
  case 76: // Log Page [L]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=log';
    break;
  case 103: // go to guild [g]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    location.href = 'index.php?cmd=guild&subcmd=manage';
    break;
  case 106: // join all group [j]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '4');}
    if (!system.getValue('enableMaxGroupSizeToJoin')) {
      location.href = 'index.php?cmd=guild&subcmd=groups&subcmd2=joinall';
    } else {
      location.href =
        'index.php?cmd=guild&subcmd=groups&subcmd2=joinallgroupsundersize';
    }
    break;
  case 98: // backpack [b]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile&subcmd=dropitems';
    break;
  case 118: // fast wear manager [v]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=notepad&blank=1&subcmd=quickwear';
    break;
  case 121: // fast send gold [y]
    sendGold.doSendGold();
    break;
  case 112: // profile [p]
    if (expandMenuOnKeyPress) {localStorage.setItem('hcs.nav.openIndex', '2');}
    location.href = 'index.php?cmd=profile';
    break;
  case 62: // move to next page [>]
  case 60: // move to prev page [<]
    movePage({62:'>', 60:'<'}[r]);
    break;
  case 33: // Shift+1
  case 64: // Shift+2
  case 34: // Shift+2 -- for UK keyboards, I think
  case 35: // Shift+3
  case 36: // Shift+4
  case 37: // Shift+5
  case 94: // Shift+6
  case 38: // Shift+7
  case 42: // Shift+8
  case 40: // Shift+9
    var keyMap = {'key33':1, 'key64':2, 'key34':2, 'key35':3, 'key36':4,
      'key37':5, 'key94':6, 'key38':7, 'key42':8, 'key40':9};
    // I'm using "key??" because I don't feel comfortable of naming properties with integers
    var itemIndex = keyMap['key' + r];
    $.get('index.php?cmd=profile').done(function(data) {
      changeCombatSet(data, itemIndex);
    });
    break;
  default:
    break;
  }
}

function replaceKeyHandler() { // Native
  expandMenuOnKeyPress = system.getValue('expandMenuOnKeyPress');
  document.onkeypress = keyPress;
}

function getEnvVars() { // Native
  calf.enableAllyOnlineList = system.getValue('enableAllyOnlineList');
  calf.enableEnemyOnlineList = system.getValue('enableEnemyOnlineList');
  calf.enableGuildInfoWidgets = system.getValue('enableGuildInfoWidgets');
  calf.enableOnlineAlliesWidgets =
    system.getValue('enableOnlineAlliesWidgets');
  calf.hideGuildInfoTrade = system.getValue('hideGuildInfoTrade');
  calf.hideGuildInfoSecureTrade = system.getValue('hideGuildInfoSecureTrade');
  calf.hideGuildInfoBuff = system.getValue('hideGuildInfoBuff');
  calf.hideGuildInfoMessage = system.getValue('hideGuildInfoMessage');
  calf.hideBuffSelected = system.getValue('hideBuffSelected');
  calf.enableTempleAlert = system.getValue('enableTempleAlert');
  calf.enableUpgradeAlert = system.getValue('enableUpgradeAlert');
  calf.enableComposingAlert = system.getValue('enableComposingAlert');
  calf.enableActiveBountyList = system.getValue('enableActiveBountyList');
  calf.enableWantedList = system.getValue('enableWantedList');
  calf.allyEnemyOnlineRefreshTime =
    system.getValue('allyEnemyOnlineRefreshTime') * 1000;
}

function hideElement(el) { // Native
  el.classList.add('fshHide');
}

function hideNodeList(nodeList) { // Native
  Array.prototype.forEach.call(nodeList, hideElement);
}

function hideQuerySelectorAll(parent, selector) { // Native - probably wrong
  hideNodeList(parent.querySelectorAll(selector));
}

function contactColour(el, obj) { // Native
  var onMouseOver = el.getAttribute('data-tipped');
  var lastActivityMinutes =
    /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
  if (lastActivityMinutes < 2) {
    el.classList.add(obj.l1);
  } else if (lastActivityMinutes < 5) {
    el.classList.add(obj.l2);
  } else {
    el.classList.add(obj.l3);
  }
}

function guildColour(el) { // Native
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function addGuildInfoWidgets() { // Native
  var guildMembrList = document.getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(guildMembrList, '#guild-minibox-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(guildMembrList, '#guild-minibox-action-send-message');
  }
  if (calf.hideBuffSelected) {
    hideNodeList(
      guildMembrList.getElementsByClassName('guild-buff-check-on'));
    document.getElementById('guild-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    guildMembrList.getElementsByClassName('player-name'), guildColour);
  Array.prototype.forEach.call(
    document.querySelectorAll('#pCR h4'),
    function(el) {
      if (el.textContent !== 'Chat') {return;}
      el.innerHTML = '<a href="index.php?cmd=guild&subcmd=chat">' +
        el.textContent + '</a>';
    }
  );
}

function alliesColour(el) { // Native
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue'
  });
}

function addOnlineAlliesWidgets() { // Native
  var onlineAlliesList = document.getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(onlineAlliesList, '#online-allies-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(onlineAlliesList, '#online-allies-action-send-message');
  }
  if (calf.hideBuffSelected) {
    hideNodeList(
      onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
    document.getElementById('ally-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
}

function conditional() { // Native
  if (calf.enableAllyOnlineList ||
      calf.enableEnemyOnlineList) {
    task.add(3, allyEnemy.prepareAllyEnemyList);
  }
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    task.add(3, activeWantedBounties.prepareBountyData);
  }
  if (calf.enableGuildInfoWidgets) {
    task.add(3, addGuildInfoWidgets);
  }
  if (calf.enableOnlineAlliesWidgets) {
    task.add(3, addOnlineAlliesWidgets);
  }
  if (calf.enableTempleAlert) {
    task.add(3, notification.injectTempleAlert);
  }
  if (calf.enableUpgradeAlert) {
    task.add(3, notification.injectUpgradeAlert);
  }
  if (calf.enableComposingAlert) {
    task.add(3, composing.injectComposeAlert);
  }
}

function navMenu() { // jQuery
  var myNav = $('#nav').data('nav');
  if (!myNav) {return;}
  var oldSave = myNav._saveState;
  myNav._saveState = function(id) {
    var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
    if (myHeight === 0) {id = -1;}
    oldSave.call(myNav, id);
  };
}

function statbarWrapper(href, id) { // Native
  var myWrapper = document.createElement('a');
  myWrapper.setAttribute('href', href);
  var character = document.getElementById(id);
  var statWrapper = character.parentNode;
  myWrapper.appendChild(character);
  statWrapper.insertBefore(myWrapper, statWrapper.firstChild);
  myWrapper.addEventListener('click', function(evt) {
    evt.stopPropagation();
  }, true);
}

function statbar() { // Native
  var sw = statbarWrapper;
  sw('index.php?cmd=profile', 'statbar-character');
  sw('index.php?cmd=points&subcmd=reserve', 'statbar-stamina');
  sw('index.php?cmd=blacksmith', 'statbar-equipment');
  sw('index.php?cmd=profile&subcmd=dropitems', 'statbar-inventory');
  sw('index.php?cmd=points', 'statbar-fsp');
  sw('index.php?cmd=bank', 'statbar-gold');
}

function formatShortDate(aDate) { // Native
  var yyyy = aDate.getFullYear();
  var dd = aDate.getDate();
  if (dd < 10) {dd = '0' + dd;}
  var ddd = days[aDate.getDay()].substr(0, 3);
  var month = months[aDate.getMonth()].substr(0, 3);
  var hh = aDate.getHours();
  if (hh < 10) {hh = '0' + hh;}
  var mm = aDate.getMinutes();
  if (mm < 10) {mm = '0' + mm;}
  return hh + ':' + mm + ' ' + ddd + ' ' + dd + '/' + month + '/' + yyyy;
}

function timeBox(nextGainTime, hrsToGo) { // Native
  var nextGain = /([0-9]+)m ([0-9]+)s/.exec(nextGainTime);
  if (!nextGain) {return;}
  return '<dd>' +
    formatShortDate(new Date(Date.now() +
    (hrsToGo * 60 * 60 + parseInt(nextGain[1], 10) * 60 +
    parseInt(nextGain[2], 10)) * 1000)) + '</dd>';
}

function injectStaminaCalculator() { // Native
  var nextGain = document.getElementsByClassName('stat-stamina-nextGain');
  if (!nextGain) {return;}
  var staminaMouseover =
    document.getElementById('statbar-stamina-tooltip-stamina');
  var stamVals = /([,0-9]+)\s\/\s([,0-9]+)/.exec(
    staminaMouseover.getElementsByClassName('stat-name')[0]
      .nextElementSibling.textContent
  );
  staminaMouseover.insertAdjacentHTML('beforeend',
    '<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>' +
    timeBox(
      nextGain[0].nextElementSibling.textContent,
      // get the max hours to still be inside stamina maximum
      Math.floor(
        (system.intValue(stamVals[2]) -
        system.intValue(stamVals[1])) /
        system.intValue(
          document.getElementsByClassName('stat-stamina-gainPerHour')[0]
            .nextElementSibling.textContent
        )
      )
    )
  );
}

function injectLevelupCalculator() { // Native
  var nextGain = document.getElementsByClassName('stat-xp-nextGain');
  if (!nextGain) {return;}
  document.getElementById('statbar-level-tooltip-general')
    .insertAdjacentHTML('beforeend',
      '<dt class="stat-xp-nextLevel">Next Level At</dt>' +
      timeBox(
        nextGain[0].nextElementSibling.textContent,
        Math.ceil(
          system.intValue(
            document.getElementsByClassName('stat-xp-remaining')[0]
              .nextElementSibling.textContent
          ) /
          system.intValue(
            document.getElementsByClassName('stat-xp-gainPerHour')[0]
              .nextElementSibling.textContent
          )
        )
      )
    );
}

function storeFSBox(boxList) { // Native
  if (!boxList) {boxList = '';}
  var fsbox = document.getElementById('minibox-fsbox')
    .getElementsByClassName('message')[0].innerHTML;
  if (boxList.indexOf(fsbox) < 0) {boxList = '<br>' + fsbox + boxList;}
  if (boxList.length > 10000) {boxList = boxList.substring(0, 10000);}
  ajax.setForage('fsh_fsboxcontent', boxList);
}

function injectFSBoxLog() { // Native
  var node = document.getElementById('minibox-fsbox');
  if (!node) {return;}
  var nodediv = node.lastElementChild;
  var playerName = nodediv.getElementsByTagName('a');
  if (playerName.length === 0) {return;}
  ajax.getForage('fsh_fsboxcontent').done(storeFSBox);
  playerName = playerName[0].textContent;
  nodediv.insertAdjacentHTML('beforeend', '<br><span class="fshPaleVioletRed">' +
    '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
    playerName + '">Ignore</a> ]</span> <span class="fshYellow">[ <a ' +
    'href="index.php?cmd=notepad&blank=1&subcmd=fsboxcontent">Log</a> ]' +
    '</span>');
}

function fixOnlineGuildBuffLinks() { // Native
  common.updateHCSQuickBuffLinks(
    '#minibox-guild-members-list #guild-minibox-action-quickbuff');
  common.updateHCSQuickBuffLinks(
    '#minibox-allies-list #online-allies-action-quickbuff');
}

function changeGuildLogHREF() { // Native
  if (!system.getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  var guildLogNode;
  var messageBox;
  if (!guildLogNodes) {return;}
  for (var i = 0; i < guildLogNodes.length; i += 1) {
    guildLogNode = guildLogNodes[i];
    guildLogNode.setAttribute('href',
      'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
  }
  //hide the lhs box
  if (location.search === '?cmd=notepad&blank=1&subcmd=newguildlog') {
    if (guildLogNode.innerHTML.search('Guild Log updated!') !== -1) { // new UI
      messageBox = guildLogNode.parentNode;
      if (messageBox) {
        messageBox.classList.add('fshHide');
      }
    }
  }
}

function moveRHSBoxUpOnRHS(title) { // Native
  document.getElementById('pCR').insertAdjacentElement('afterbegin',
    document.getElementById(title));
}

function moveRHSBoxToLHS(title) { // Native
  var boxDiv = document.getElementById(title);
  boxDiv.classList.add('pCR');
  document.getElementById('pCL').appendChild(boxDiv);
}

function injectMenu() { // jQuery.min
  if (!document.getElementById('pCL')) {return;}
  if (system.getValue('lastActiveQuestPage').length > 0) {
    document.querySelector('#pCL a[href="index.php?cmd=questbook"]')
      .setAttribute('href', system.getValue('lastActiveQuestPage'));
  }
  //character
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
  //guild
  document.getElementById('nav-guild-storehouse-inventory').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'guild-guildinvmanager" href="index.php?cmd=notepad&blank=1' +
      '&subcmd=guildinvmgr">Guild Inventory</a></li>');
  if (!system.getValue('useNewGuildLog')) {
    //if not using the new guild log, show it as a separate menu entry
    document.getElementById('nav-guild-ledger-guildlog').parentNode
      .insertAdjacentHTML('beforebegin',
        '<li class="nav-level-2"><a class="nav-link" ' +
        'href="index.php?cmd=notepad&blank=1&subcmd=newguildlog"' +
        '>New Guild Log</a></li>');
  }
  //top rated
  document.getElementById('nav-toprated-players-level').parentNode
    .insertAdjacentHTML('afterend',
      '<li class="nav-level-2"><a class="nav-link" id="nav-' +
      'toprated-top250" href="index.php?cmd=toprated&subcmd=xp">' +
      'Top 250 Players</a></li>');
  //actions
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
  myNav.heights = [ null, null,
    // Character
    document.getElementById('nav-character').nextElementSibling.children
      .length * 22,
    660,
    // Guild
    document.querySelectorAll('#nav-guild > ul li').length * 22,
    374, 132, 132, null ];
  if (myNav.state !== '-1' && myNav.state !== -1) {
    // and now the open one
    theNav.children[myNav.state].children[1].style.height =
      myNav.heights[myNav.state] + 'px';
  }
}

function notHuntMode() { // Native
  //move boxes in opposite order that you want them to appear.
  if (system.getValue('moveGuildList')) {
    task.add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
  if (system.getValue('moveOnlineAlliesList')) {
    task.add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
  if (system.getValue('moveFSBox')) {
    task.add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }

  getEnvVars();
  conditional();

  task.add(3, navMenu);
  task.add(3, statbar);

  task.add(3, injectStaminaCalculator);
  task.add(3, injectLevelupCalculator);

  task.add(3, injectMenu);

  if (system.getValue('fsboxlog')) {
    task.add(3, injectFSBoxLog);
  }
  task.add(3, fixOnlineGuildBuffLinks);

  task.add(3, notification.injectJoinAllLink);
  task.add(3, changeGuildLogHREF);
  task.add(3, news.injectHomePageTwoLink);

  task.add(3, messaging.injectQuickMsgDialogJQ);
}

function prepareEnv() { // Native

  if (system.getValue('gameHelpLink')) {
    task.add(3, gameHelpLink);
  }

  calf.huntingMode = system.getValue('huntingMode');
  task.add(3, replaceKeyHandler);

  if (!calf.huntingMode) {
    notHuntMode();
  }

  if (!system.getValue('hideHelperMenu')) {
    task.add(3, helperMenu.injectHelperMenu);
  }

}

function asyncDispatcher() { // Native
  //#if _DEV  //  asyncDispatcher messages
  console.log('functionPath', functionPath); // DEV Only
  if (!coreFunction) {
    console.log('No Core Function.'); // DEV Only
    return;
  }
  if (typeof coreFunction !== 'function') {
    console.log('Not Core Function.'); // DEV Only
    return;
  }
  //#endif
  if (typeof coreFunction === 'function') {
    fshGa.screenview(functionPath);
    fshGa.start('JS Perf', functionPath);
    coreFunction();
    fshGa.end('JS Perf', functionPath);
  }
}

function doMsgSound() { // jQuery
  var soundLocation = system.getValue('defaultMessageSound');
  $('a:contains("New log messages"):first').each(function(){
    $(this).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
  $('a:contains("New Guild chat message"):first').each(function(){
    $(this).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
}

function injectQuickLinks() { // Native ?
  var node = document.getElementById('statbar-container');
  if (!node) {return;}
  var quickLinks = system.getValueJSON('quickLinks') || [];
  if (quickLinks.length <= 0) {return;}
  var draggableQuickLinks = system.getValue('draggableQuickLinks');
  var html = '<div style="top:' +
    system.getValue('quickLinksTopPx') + 'px; left:' +
    system.getValue('quickLinksLeftPx') + 'px; background-image:' +
    'url(\'' + system.imageServer + '/skin/inner_bg.jpg\');" ' +
    'id="fshQuickLinks" class="fshQuickLinks' +
    (system.getValue('keepHelperMenuOnScreen') ? ' fshFixed' : '') +
    (draggableQuickLinks ? ' fshLink" draggable="true"' : '"') +
    '>';
  for (var i = 0; i < quickLinks.length; i += 1) {
    html += '<li><a href="' + quickLinks[i].url + '"' +
      (quickLinks[i].newWindow ? ' target=new' : '') +
      '>' + quickLinks[i].name + '</a></li>';
  }
  html += '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  if (draggableQuickLinks) {
    document.getElementById('fshQuickLinks')
      .addEventListener('dragstart', common.drag_start, false);
  }
}

// main event dispatcher
FSH.dispatch = function dispatch() { // Native

  fshGa.setup();

  fshGa.start('JS Perf', 'FSH.dispatch');

  getCoreFunction();

  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }

  task.add(3, asyncDispatcher);

  if (typeof window.jQuery === 'undefined') {return;}

  if (system.getValue('playNewMessageSound')) {
    task.add(3, doMsgSound);
  }

  // This must be at the end in order not to screw up other system.findNode calls (Issue 351)
  if (!calf.huntingMode) {
    task.add(3, injectQuickLinks);
  }

  fshGa.end('JS Perf', 'FSH.dispatch');

};
