import add from '../../support/task';
import addGuildInfoWidgets from '../widgets/addGuildInfoWidgets';
import addOnlineAlliesWidgets from '../widgets/addOnlineAlliesWidgets';
import calf from '../../support/calf';
import injectComposeAlert from '../../composing/injectComposeAlert';
import injectTempleAlert from '../notification/injectTempleAlert';
import injectUpgradeAlert from '../notification/injectUpgradeAlert';
import prepareAllyEnemyList from '../allyEnemy';
import {prepareBountyData} from '../activeWantedBounties/activeWantedBounties';

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

export default function conditional() {
  callAllyEnemy();
  callBounties();
  callGuildInfo();
  callAllies();
  callTemple();
  callUpgrade();
  callComposing();
}
