import calf from '../../support/calf';
import runDefault from '../../common/runDefault';

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

export default function conditional() {
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}
