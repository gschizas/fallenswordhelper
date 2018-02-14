import add from '../support/task';
import displayUpgradeMsg from './displayUpgradeMsg';
import getValue from '../system/getValue';
import jQueryPresent from '../common/jQueryPresent';
import {now} from '../support/constants';
import parseGoldUpgrades from './parseGoldUpgrades';
import retryAjax from '../ajax/retryAjax';

function checkLastUpgrade() {
  var lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && now < lastUpgradeCheck) {return;}
  retryAjax('index.php?no_mobile=1&cmd=points&type=1').done(function(data) {
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
  if (jQueryPresent && location.search.indexOf('cmd=points&type=1') === -1) {
    notUpgradesPage();
  }
}
