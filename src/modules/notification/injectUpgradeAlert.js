import add from '../support/task';
import displayUpgradeMsg from './displayUpgradeMsg';
import {getValue} from '../system/system';
import {now} from '../support/dataObj';
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
  if (location.search.indexOf('cmd=points&type=1') === -1) {notUpgradesPage();}
}
