import { u as indexAjaxData, j as jQueryPresent, a as add, G as getValue, a6 as now } from './calfSystem-b0234231.js';
import { n as notGoldUpgradesPage, p as parseGoldUpgrades, d as displayUpgradeMsg } from './parseGoldUpgrades-8ab307af.js';

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
//# sourceMappingURL=injectUpgradeAlert-8c6a0733.js.map
