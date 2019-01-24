import add from '../../support/task';
import displayUpgradeMsg from './displayUpgradeMsg';
import getValue from '../../system/getValue';
import jQueryPresent from '../../common/jQueryPresent';
import notGoldUpgradesPage from './notGoldUpgradesPage';
import {now} from '../../support/constants';
import parseGoldUpgrades from './parseGoldUpgrades';
import upgradesGold from '../../ajax/upgradesGold';

function checkLastUpgrade() {
  var lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && now < lastUpgradeCheck) {return;}
  upgradesGold().done(function(data) {
    add(3, parseGoldUpgrades, [data]);
  });
}

function notUpgradesPage() {
  if (getValue('needToDoUpgrade')) {
    displayUpgradeMsg();
    return;
  }
  checkLastUpgrade();
}

export default function injectUpgradeAlert() { // jQuery
  if (jQueryPresent() && notGoldUpgradesPage()) {
    notUpgradesPage();
  }
}
