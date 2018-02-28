import add from '../support/task';
import calf from '../support/calf';
import changeGuildLogHREF from './changeGuildLogHREF';
import {getElementById} from '../common/getElement';
import getValue from '../system/getValue';
import guildActivity from '../guild/guildActivity';
import {injectComposeAlert} from '../composing/composing';
import injectFSBoxLog from './injectFSBoxLog';
import injectHelperMenu from './helperMenu';
import injectHomePageTwoLink from '../news/injectHomePageTwoLink';
import injectJoinAllLink from '../notification/injectJoinAllLink';
import injectMenu from './accordion';
import injectQuickMsgDialogJQ from './messaging';
import injectServerNode from './injectServerNode';
import injectTempleAlert from '../notification/injectTempleAlert';
import injectUpgradeAlert from '../notification/injectUpgradeAlert';
import insertElement from '../common/insertElement';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import interceptQuickBuff from './interceptQuickBuff';
import jsonParse from '../common/jsonParse';
import navMenu from './navMenu';
import {pCR} from '../support/layout';
import prepareAllyEnemyList from './allyEnemy';
import {prepareBountyData} from '../activeWantedBounties/activeWantedBounties';
import replaceKeyHandler from './keyHandler';
import scoutTowerLink from './scoutTowerLink';
import {seLog} from '../seLog/seLog';
import statbar from './statBar';
import {addGuildInfoWidgets, addOnlineAlliesWidgets} from './widgets';
import {injectLevelupCalculator, injectStaminaCalculator} from './calc';

function gameHelpLink() {
  var nodeList = document.querySelectorAll('#pCR h3');
  Array.prototype.forEach.call(nodeList, function(el) {
    if (el.textContent === 'Game Help') {
      el.innerHTML = '<a href="index.php?cmd=settings">Game Help</a>';
    }
  });
}

function getEnvVars() {
  calf.enableAllyOnlineList = getValue('enableAllyOnlineList');
  calf.enableEnemyOnlineList = getValue('enableEnemyOnlineList');
  calf.enableGuildInfoWidgets = getValue('enableGuildInfoWidgets');
  calf.enableOnlineAlliesWidgets =
    getValue('enableOnlineAlliesWidgets');
  calf.enableSeTracker = getValue('enableSeTracker');
  calf.hideGuildInfoTrade = getValue('hideGuildInfoTrade');
  calf.hideGuildInfoSecureTrade = getValue('hideGuildInfoSecureTrade');
  calf.hideGuildInfoBuff = getValue('hideGuildInfoBuff');
  calf.hideGuildInfoMessage = getValue('hideGuildInfoMessage');
  calf.hideBuffSelected = getValue('hideBuffSelected');
  calf.enableTempleAlert = getValue('enableTempleAlert');
  calf.enableUpgradeAlert = getValue('enableUpgradeAlert');
  calf.enableComposingAlert = getValue('enableComposingAlert');
  calf.enableActiveBountyList = getValue('enableActiveBountyList');
  calf.enableWantedList = getValue('enableWantedList');
  calf.wantedGuildMembers = getValue('wantedGuildMembers');
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

function notHuntMode() {
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  doMoveGuildList();
  doMoveAllyList();
  doMoveDailyQuest();
  doMoveFsBox();

  getEnvVars();
  conditional();

  add(3, navMenu);
  add(3, statbar);

  add(3, injectStaminaCalculator);
  add(3, injectLevelupCalculator);

  add(3, injectMenu);

  if (getValue('fsboxlog')) {
    add(3, injectFSBoxLog);
  }
  add(3, interceptQuickBuff);

  add(3, injectJoinAllLink);
  add(3, changeGuildLogHREF);
  add(3, injectHomePageTwoLink);

  add(3, injectQuickMsgDialogJQ);

  add(3, injectServerNode);
  add(3, scoutTowerLink);

  add(4, guildActivity);
  add(4, seLog);
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

export default function lookForHcsData() {
  var hcsData = getElementById('html');
  if (hcsData && jsonParse(hcsData.dataset.hcs)['new-ui']) {
    prepareEnv();
  }
}
