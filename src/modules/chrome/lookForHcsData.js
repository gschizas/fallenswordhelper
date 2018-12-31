import add from '../support/task';
import addGuildInfoWidgets from './widgets/addGuildInfoWidgets';
import addOnlineAlliesWidgets from './widgets/addOnlineAlliesWidgets';
import calf from '../support/calf';
import changeGuildLogHREF from './changeGuildLogHREF';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import guildActivity from '../guild/guildActivity';
import injectComposeAlert from '../composing/injectComposeAlert';
import injectFSBoxLog from './injectFSBoxLog';
import injectHelperMenu from './helperMenu';
import injectHomePageTwoLink from '../news/injectHomePageTwoLink';
import injectJoinAllLink from './notification/injectJoinAllLink';
import injectLevelupCalculator from './calcs/injectLevelupCalculator';
import injectMenu from './accordion/injectMenu';
import injectQuickMsgDialogJQ from './messaging';
import injectServerNode from './injectServerNode';
import injectStaminaCalculator from './calcs/injectStaminaCalculator';
import injectTempleAlert from './notification/injectTempleAlert';
import injectUpgradeAlert from './notification/injectUpgradeAlert';
import insertElement from '../common/insertElement';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import interceptQuickBuff from './interceptQuickBuff';
import jsonParse from '../common/jsonParse';
import navMenu from './navMenu';
import {pCR} from '../support/layout';
import prepareAllyEnemyList from './allyEnemy';
import {prepareBountyData} from './activeWantedBounties/activeWantedBounties';
import replaceKeyHandler from './keyHandler';
import scoutTowerLink from './scoutTowerLink';
import {seLog} from '../seLog/seLog';
import statbar from './statBar';

function gameHelpLink() {
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function getEnvVars() {
  [
    'enableAllyOnlineList',
    'enableEnemyOnlineList',
    'enableGuildInfoWidgets',
    'enableOnlineAlliesWidgets',
    'enableSeTracker',
    'hideGuildInfoTrade',
    'hideGuildInfoSecureTrade',
    'hideGuildInfoBuff',
    'hideGuildInfoMessage',
    'hideBuffSelected',
    'enableTempleAlert',
    'enableUpgradeAlert',
    'enableComposingAlert',
    'enableActiveBountyList',
    'enableWantedList',
    'wantedGuildMembers'
  ].forEach(function(el) {calf[el] = getValue(el);});
  calf.allyEnemyOnlineRefreshTime =
    getValue('allyEnemyOnlineRefreshTime') * 1000;
}

function callAllyEnemy() {
  if (calf.enableAllyOnlineList ||
      calf.enableEnemyOnlineList) {
    add(3, prepareAllyEnemyList);
  }
}

function callBounties() {
  if (calf.enableWantedList ||
      calf.enableActiveBountyList) {
    add(3, prepareBountyData);
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    add(3, addGuildInfoWidgets);
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    add(3, addOnlineAlliesWidgets);
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    add(3, injectTempleAlert);
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    add(3, injectUpgradeAlert);
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    add(3, injectComposeAlert);
  }
}

function conditional() {
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}

function moveRHSBoxUpOnRHS(title) {
  var box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

function moveRHSBoxToLHS(title) {
  var boxDiv = getElementById(title);
  if (boxDiv) {
    boxDiv.classList.add('pCR');
    insertElement(getElementById('pCL'), boxDiv);
  }
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-guild']);
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    add(3, moveRHSBoxUpOnRHS, ['minibox-allies']);
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    add(3, moveRHSBoxToLHS, ['minibox-fsbox']);
  }
}

function doMoveDailyQuest() {
  if (getValue('moveDailyQuest')) {
    add(3, moveRHSBoxToLHS, ['minibox-daily-quest']);
  }
}

function priorityThree() {
  [
    navMenu,
    statbar,
    injectStaminaCalculator,
    injectLevelupCalculator,
    injectMenu,
    injectFSBoxLog,
    interceptQuickBuff,
    injectJoinAllLink,
    changeGuildLogHREF,
    injectHomePageTwoLink,
    injectQuickMsgDialogJQ,
    injectServerNode,
    scoutTowerLink
  ].forEach(function(fn) {add(3, fn);});
}

function priorityFour() {
  [
    guildActivity,
    seLog
  ].forEach(function(fn) {add(4, fn);});
}

function notHuntMode() {
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  doMoveGuildList();
  doMoveAllyList();
  doMoveDailyQuest();
  doMoveFsBox();
  getEnvVars();
  conditional();
  priorityThree();
  priorityFour();
}

function prepareEnv() {
  if (getValue('gameHelpLink')) {
    add(3, gameHelpLink);
  }
  calf.huntingMode = getValue('huntingMode');
  add(3, replaceKeyHandler);
  notHuntMode();
  if (!getValue('hideHelperMenu')) {
    add(3, injectHelperMenu);
  }
}

function findHcsData() {
  var hcsHtml = getElementById('html');
  if (hcsHtml) {return hcsHtml.dataset.hcs;}
}

export default function lookForHcsData() {
  var hcsData = findHcsData();
  if (hcsData && jsonParse(hcsData)['new-ui']) {
    prepareEnv();
  }
}
