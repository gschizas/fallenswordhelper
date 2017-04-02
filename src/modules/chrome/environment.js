import calf from '../support/calf';
import pageSwitcher from './pageSwitcher';
import * as accordion from './accordion';
import * as activeWantedBounties from './activeWantedBounties';
import * as ajax from '../support/ajax';
import * as allyEnemy from './allyEnemy';
import * as calc from './calc';
import * as common from '../support/common';
import * as composing from '../composing/composing';
import * as fshGa from '../support/fshGa';
import * as helperMenu from './helperMenu';
import * as keyHandler from './keyHandler';
import * as messaging from './messaging';
import * as news from '../news';
import * as notification from '../notification';
import * as statBar from './statBar';
import * as system from '../support/system';
import * as task from '../support/task';
import * as widgets from './widgets';

var coreFunction;
var functionPath;

function newParam(param) {
  return system.getUrlParameter(param) || '-';
}

function newSelector(selector) {
  var test_cmd = document.querySelector(selector);
  return test_cmd && test_cmd.value || '-';
}

function getCoreFunction() { // Native
  var cmd;
  var subcmd;
  var subcmd2;
  var type;
  var fromWorld;
  if (document.location.search !== '') {
    cmd = newParam('cmd');
    subcmd = newParam('subcmd');
    subcmd2 = newParam('subcmd2');
    type = newParam('type');
    fromWorld = newParam('fromworld');
  } else {
    cmd = newSelector('input[name="cmd"]');
    subcmd = newSelector('input[name="subcmd"]');
    if (subcmd === 'dochat') {
      cmd = '-';
      subcmd = '-';
    }
    subcmd2 = newSelector('input[name="subcmd2"]');
    type = '-';
    fromWorld = '-';
  }
  //#if _DEV  //  TODO patch for types that we don't care about
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

function callAllyEnemy() {
  if (calf.enableAllyOnlineList ||
      calf.enableEnemyOnlineList) {
    task.add(3, allyEnemy.prepareAllyEnemyList);
  }
}

function callBounties() {
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    task.add(3, activeWantedBounties.prepareBountyData);
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    task.add(3, widgets.addGuildInfoWidgets);
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    task.add(3, widgets.addOnlineAlliesWidgets);
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    task.add(3, notification.injectTempleAlert);
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    task.add(3, notification.injectUpgradeAlert);
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    task.add(3, composing.injectComposeAlert);
  }
}

function conditional() { // Native
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}

function navMenu() { // jQuery
  var myNav = $('#nav').data('nav');
  if (!myNav) {return;}
  var oldSave = myNav._saveState;
  myNav._saveState = function(_id) {
    var id = _id;
    var myHeight = $('li.nav-level-0', '#nav').eq(id).find('ul').height();
    if (myHeight === 0) {id = -1;}
    oldSave.call(myNav, id);
  };
}

function storeFSBox(_boxList) { // Native
  var boxList = _boxList;
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
  nodediv.insertAdjacentHTML('beforeend',
    '<br><span class="fshPaleVioletRed">' +
    '[ <a href="index.php?cmd=log&subcmd=doaddignore&ignore_username=' +
    playerName + '">Ignore</a> ]</span> <span class="fshYellow">[ <a ' +
    'href="index.php?cmd=notepad&blank=1&subcmd=fsboxcontent">Log</a> ]' +
    '</span>');
}

function hideGuildLogMsg(guildLogNode) {
  // hide the lhs box
  if (location.search !== '?cmd=notepad&blank=1&subcmd=newguildlog' ||
      guildLogNode.innerHTML.search('Guild Log updated!') === -1) {return;}
  var messageBox = guildLogNode.parentNode;
  if (messageBox) {
    messageBox.classList.add('fshHide');
  }
}

function changeGuildLogHREF() { // Native
  if (!system.getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  if (!guildLogNodes) {return;}
  var guildLogNode;
  for (var i = 0; i < guildLogNodes.length; i += 1) {
    guildLogNode = guildLogNodes[i];
    guildLogNode.setAttribute('href',
      'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
  }
  hideGuildLogMsg(guildLogNode);
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

function notHuntMode() { // Native
  // move boxes in opposite order that you want them to appear.
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
  task.add(3, statBar.statbar);

  task.add(3, calc.injectStaminaCalculator);
  task.add(3, calc.injectLevelupCalculator);

  task.add(3, accordion.injectMenu);

  if (system.getValue('fsboxlog')) {
    task.add(3, injectFSBoxLog);
  }
  task.add(3, widgets.fixOnlineGuildBuffLinks);

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
  task.add(3, keyHandler.replaceKeyHandler);

  if (!calf.huntingMode) {
    notHuntMode();
  }

  if (!system.getValue('hideHelperMenu')) {
    task.add(3, helperMenu.injectHelperMenu);
  }

}

function asyncDispatcher() { // Native
  //#if _DEV  //  asyncDispatcher messages
  /* eslint-disable no-console */
  console.log('functionPath', functionPath);
  if (!coreFunction) {
    console.log('No Core Function.');
    return;
  }
  if (typeof coreFunction !== 'function') {
    console.log('Not Core Function.');
    return;
  }
  /* eslint-enable no-console */
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
  $('a:contains("New log messages"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
  $('a:contains("New Guild chat message"):first').each(function(i, e) {
    $(e).after('<audio src="' + soundLocation +
    '" autoplay=true />');
  });
}

function retOption(option, ifTrue, ifFalse) {
  if (system.getValue(option)) {
    return ifTrue;
  }
  return ifFalse;
}

function retBool(bool, ifTrue, ifFalse) {
  if (bool) {
    return ifTrue;
  }
  return ifFalse;
}

function injectQuickLinks() { // Native ?
  var node = document.getElementById('statbar-container');
  if (!node) {return;}
  var quickLinks = system.getValueJSON('quickLinks') || [];
  if (quickLinks.length <= 0) {return;}
  var quickLinksTopPx = system.getValue('quickLinksTopPx');
  var quickLinksLeftPx = system.getValue('quickLinksLeftPx');
  var draggableQuickLinks = system.getValue('draggableQuickLinks');
  var draggableQuickLinksClass = retBool(draggableQuickLinks,
    ' fshLink" draggable="true"', '"');
  var html = '<div style="top:' + quickLinksTopPx + 'px; left:' +
    quickLinksLeftPx + 'px; background-image:url(\'' + system.imageServer +
    '/skin/inner_bg.jpg\');" id="fshQuickLinks" class="fshQuickLinks' +
    retOption('keepHelperMenuOnScreen',
    ' fshFixed', '') + draggableQuickLinksClass + '>';
  for (var i = 0; i < quickLinks.length; i += 1) {
    var newWindow = retBool(quickLinks[i].newWindow, ' target="new"', '');
    html += '<li><a href="' + system.escapeHtml(quickLinks[i].url) + '"' +
      newWindow + '>' + quickLinks[i].name + '</a></li>';
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

  /* This must be at the end in order not to
  screw up other system.findNode calls (Issue 351) */
  if (!calf.huntingMode) {
    task.add(3, injectQuickLinks);
  }

  fshGa.end('JS Perf', 'FSH.dispatch');

};
