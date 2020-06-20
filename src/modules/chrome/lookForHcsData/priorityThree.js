import asyncPThree from '../../common/asyncPThree';
import calf from '../../support/calf';
import { defEnableGuildActivityTracker } from '../../support/constants';
import getValue from '../../system/getValue';
import injectMenu from '../accordion/injectMenu';
import injectQuickMsgDialogJQ from '../messaging/messaging';
import jQueryPresent from '../../common/jQueryPresent';
import runDefault from '../../common/runDefault';

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

function callAllyEnemy() {
  if (calf.enableAllyOnlineList
      || calf.enableEnemyOnlineList) {
    runDefault(import('../allyEnemy/allyEnemy'));
  }
}

function callBounties() {
  if (calf.enableWantedList
      || calf.enableActiveBountyList) {
    runDefault(import('../activeWantedBounties/activeWantedBounties'));
  }
}

function callGuildInfo() {
  if (calf.enableGuildInfoWidgets) {
    runDefault(import('../widgets/addGuildInfoWidgets'));
  }
}

function callAllies() {
  if (calf.enableOnlineAlliesWidgets) {
    runDefault(import('../widgets/addOnlineAlliesWidgets'));
  }
}

function callTemple() {
  if (calf.enableTempleAlert) {
    runDefault(import('../notification/injectTempleAlert'));
  }
}

function callUpgrade() {
  if (calf.enableUpgradeAlert) {
    runDefault(import('../notification/injectUpgradeAlert'));
  }
}

function callComposing() {
  if (calf.enableComposingAlert) {
    runDefault(import('../../composing/injectComposeAlert'));
  }
}

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
const p3functions = [
  doMoveGuildList,
  doMoveAllyList,
  doMoveDailyQuest,
  doMoveFsBox,
  callAllyEnemy,
  callBounties,
  callGuildInfo,
  callAllies,
  callTemple,
  callUpgrade,
  callComposing,
  injectMenu,
  injectQuickMsgDialogJQ,
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

export default function priorityThree() {
  // eslint-disable-next-line no-unused-labels, no-labels
  // devLbl: { //  doMoveXmas
  //   doMoveXmas();
  // }
  asyncPThree(p3functions);
}
