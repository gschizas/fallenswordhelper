import calf from '../../support/calf';
import conditional from './conditional';
import { defEnableGuildActivityTracker } from '../../support/constants';
import executeAll from '../../common/executeAll';
import getCalfPrefs from '../../common/getCalfPrefs';
import getValue from '../../system/getValue';
import jQueryPresent from '../../common/jQueryPresent';
import priorityThree from './priorityThree';
import runDefault from '../../common/runDefault';

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
    'wantedGuildMembers',
  ].forEach(getCalfPrefs);
  calf.allyEnemyOnlineRefreshTime = getValue('allyEnemyOnlineRefreshTime') * 1000;
}

function moveUp(title) {
  import('./moveRHSBoxUpOnRHS').then((m) => m.default(title));
}

function moveLeft(title) {
  import('./moveRHSBoxToLHS').then((m) => m.default(title));
}

function doMoveGuildList() {
  if (getValue('moveGuildList')) {
    moveUp('minibox-guild');
  }
}

function doMoveAllyList() {
  if (getValue('moveOnlineAlliesList')) {
    moveUp('minibox-allies');
  }
}

function doMoveFsBox() {
  if (getValue('moveFSBox')) {
    moveLeft('minibox-fsbox');
  }
}

function doMoveDailyQuest() {
  if (getValue('moveDailyQuest')) {
    moveLeft('minibox-daily-quest');
  }
}

// function doMoveXmas() {
//   if (getValue('moveXmasBox')) {
//     moveLeft('minibox-xmas');
//   }
// }

function statbar() {
  if (getValue('statBarLinks')) {
    runDefault(import('../statBar'));
  }
}

function staminaCalc() {
  if (getValue('staminaCalculator')) {
    runDefault(import('../calcs/injectStaminaCalculator'));
  }
}

function levelCalc() {
  if (getValue('levelUpCalculator')) {
    runDefault(import('../calcs/injectLevelupCalculator'));
  }
}

function fsBoxLog() {
  if (getValue('fsboxlog')) {
    runDefault(import('../injectFSBoxLog'));
  }
}

function expandQb() {
  if (getValue('resizeQuickBuff')) {
    runDefault(import('../interceptQuickBuff'));
  }
}

function joinAll() {
  if (getValue('joinAllLink')) {
    runDefault(import('../notification/injectJoinAllLink'));
  }
}

function guildLogHref() {
  if (getValue('useNewGuildLog')) {
    runDefault(import('../changeGuildLogHREF'));
  }
}

function gameStats() {
  if (getValue('addServerNode')) {
    runDefault(import('../injectServerNode'));
  }
}

function scoutTower() {
  if (getValue('addScoutTowerLink')) {
    runDefault(import('../scoutTowerLink'));
  }
}

function guildActivityTracker() {
  if (jQueryPresent() && getValue(defEnableGuildActivityTracker)) {
    runDefault(import('../../guild/guildActivity'));
  }
}

function seTracker() {
  if (jQueryPresent() && calf.enableSeTracker && calf.cmd !== 'superelite') {
    import('../../seLog/seLog').then((m) => m.seLog());
  }
}

// move boxes in opposite order that you want them to appear.
const notHuntModeFunctions = [
  doMoveGuildList,
  doMoveAllyList,
  doMoveDailyQuest,
  doMoveFsBox,
  getEnvVars,
  conditional,
  priorityThree,
  statbar,
  staminaCalc,
  levelCalc,
  fsBoxLog,
  expandQb,
  joinAll,
  guildLogHref,
  gameStats,
  scoutTower,
  guildActivityTracker,
  seTracker,
];

export default function notHuntMode() {
  if (calf.huntingMode) { return; }
  // eslint-disable-next-line no-unused-labels, no-labels
  // devLbl: { //  doMoveXmas
  //   doMoveXmas();
  // }
  executeAll(notHuntModeFunctions);
}
