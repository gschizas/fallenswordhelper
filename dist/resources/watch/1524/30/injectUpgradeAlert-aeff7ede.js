import { u as indexAjaxData, j as jQueryPresent, a as add, G as getValue, a6 as now } from './calfSystem-d357ca6f.js';
import { n as notGoldUpgradesPage, p as parseGoldUpgrades, d as displayUpgradeMsg } from './parseGoldUpgrades-944fdfb4.js';

function upgradesGold() {
  return indexAjaxData({
    cmd: 'points',
    type: 1,
  });
}

function asyncParse(data) {
  add(3, parseGoldUpgrades, [data]);
}

function checkLastUpgrade() {
  const lastUpgradeCheck = getValue('lastUpgradeCheck');
  if (lastUpgradeCheck && now < lastUpgradeCheck) { return; }
  upgradesGold().then(asyncParse);
}

function notUpgradesPage() {
  if (getValue('needToDoUpgrade')) {
    displayUpgradeMsg();
    return;
  }
  checkLastUpgrade();
}

function injectUpgradeAlert() {
  if (jQueryPresent() && notGoldUpgradesPage()) {
    notUpgradesPage();
  }
}

export default injectUpgradeAlert;
//# sourceMappingURL=injectUpgradeAlert-aeff7ede.js.map
