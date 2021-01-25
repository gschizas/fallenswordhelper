import { u as indexAjaxData, j as jQueryPresent, a as add, H as getValue, a5 as now } from './calfSystem-e64be67d.js';
import { n as notGoldUpgradesPage, p as parseGoldUpgrades, d as displayUpgradeMsg } from './parseGoldUpgrades-ce3e6ab1.js';

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
//# sourceMappingURL=injectUpgradeAlert-baad80c0.js.map
