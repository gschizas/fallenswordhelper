import add from '../../support/task';
import calf from '../../support/calf';
import conditional from './conditional';
import executeAll from '../../common/executeAll';
import getCalfPrefs from '../../common/getCalfPrefs';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import guildActivity from '../../guild/guildActivity';
import insertElement from '../../common/insertElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import {pCR} from '../../support/layout';
import priorityThree from './priorityThree';
import {seLog} from '../../seLog/seLog';

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
  ].forEach(getCalfPrefs);
  calf.allyEnemyOnlineRefreshTime =
    getValue('allyEnemyOnlineRefreshTime') * 1000;
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

function priorityFour() {
  [
    guildActivity,
    seLog
  ].forEach(function(fn) {add(4, fn);});
}

export default function notHuntMode() {
  if (calf.huntingMode) {return;}
  // move boxes in opposite order that you want them to appear.
  executeAll([
    doMoveGuildList,
    doMoveAllyList,
    doMoveDailyQuest,
    doMoveFsBox,
    getEnvVars,
    conditional,
    priorityThree,
    priorityFour
  ]);
}
