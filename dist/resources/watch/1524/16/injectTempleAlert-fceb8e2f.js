import { c as calf, w as jQueryNotPresent, a6 as now, D as getValue, t as indexAjaxData, b$ as parseTemplePage, c0 as displayDisconnectedFromGodsMessage } from './calfSystem-6e4b53e3.js';

function checkLastUpdate(templeAlertLastUpdate) {
  return !templeAlertLastUpdate || now > templeAlertLastUpdate;
}

function doWeNeedToParse() {
  if (checkLastUpdate(getValue('lastTempleCheck'))) {
    indexAjaxData({ cmd: 'temple' }).then(parseTemplePage);
  } else if (getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
}

function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple' || jQueryNotPresent()) { return; }
  doWeNeedToParse();
}

export default injectTempleAlert;
//# sourceMappingURL=injectTempleAlert-fceb8e2f.js.map
