import calf from '../support/calf';
import injectHelperMenu from './helperMenu';
import injectHomePageTwoLink from '../news/injectHomePageTwoLink';
import injectMenu from './accordion';
import injectQuickMsgDialogJQ from './messaging';
import prepareAllyEnemyList from './allyEnemy';
import prepareBountyData from './activeWantedBounties';
import replaceKeyHandler from './keyHandler';
import statbar from './statBar';
import * as ajax from '../support/ajax';
import * as calc from './calc';
import * as composing from '../composing/composing';
import * as notification from '../notification';
import * as system from '../support/system';
import * as task from '../support/task';
import * as widgets from './widgets';

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
    task.add(3, prepareAllyEnemyList);
  }
}

function callBounties() {
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    task.add(3, prepareBountyData);
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

function getBoxList(boxList) { // Native
  if (boxList) {return boxList;}
  return '';
}

function storeFSBox(_boxList) { // Native
  var boxList = getBoxList(_boxList);
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

function testForGuildLogMsg(guildLogNode) { // Native
  return location.search !== '?cmd=notepad&blank=1&subcmd=newguildlog' ||
    guildLogNode.innerHTML.search('Guild Log updated!') === -1;
}

function hideGuildLogMsg(guildLogNode) { // Native
  // hide the lhs box
  if (testForGuildLogMsg(guildLogNode)) {return;}
  var messageBox = guildLogNode.parentNode;
  if (messageBox) {
    messageBox.classList.add('fshHide');
  }
}

function gotGuildLogNodes(guildLogNodes) { // Native
  var guildLogNode;
  for (var i = 0; i < guildLogNodes.length; i += 1) {
    guildLogNode = guildLogNodes[i];
    guildLogNode.setAttribute('href',
      'index.php?cmd=notepad&blank=1&subcmd=newguildlog');
  }
  hideGuildLogMsg(guildLogNode);
}

function changeGuildLogHREF() { // Native
  if (!system.getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  if (guildLogNodes) {gotGuildLogNodes(guildLogNodes);}
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

function doMoveGuildList() { // Native
  if (system.getValue('moveGuildList')) {
    task.add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
}

function doMoveAllyList() { // Native
  if (system.getValue('moveOnlineAlliesList')) {
    task.add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
}

function doMoveFsBox() { // Native
  if (system.getValue('moveFSBox')) {
    task.add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }
}

function notHuntMode() { // Native
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  doMoveGuildList();
  doMoveAllyList();
  doMoveFsBox();

  getEnvVars();
  conditional();

  task.add(3, navMenu);
  task.add(3, statbar);

  task.add(3, calc.injectStaminaCalculator);
  task.add(3, calc.injectLevelupCalculator);

  task.add(3, injectMenu);

  if (system.getValue('fsboxlog')) {
    task.add(3, injectFSBoxLog);
  }
  task.add(3, widgets.fixOnlineGuildBuffLinks);

  task.add(3, notification.injectJoinAllLink);
  task.add(3, changeGuildLogHREF);
  task.add(3, injectHomePageTwoLink);

  task.add(3, injectQuickMsgDialogJQ);
}

function prepareEnv() { // Native
  if (system.getValue('gameHelpLink')) {
    task.add(3, gameHelpLink);
  }
  calf.huntingMode = system.getValue('huntingMode');
  task.add(3, replaceKeyHandler);
  notHuntMode();
  if (!system.getValue('hideHelperMenu')) {
    task.add(3, injectHelperMenu);
  }
}

export default function lookForHcsData() { // Native
  var hcsData = document.getElementById('html');
  if (hcsData && JSON.parse(hcsData.getAttribute('data-hcs'))['new-ui']) {
    prepareEnv();
  }
}
