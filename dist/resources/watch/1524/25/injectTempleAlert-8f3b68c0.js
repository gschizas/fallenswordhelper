import { c as calf, x as jQueryNotPresent, a6 as now, G as getValue, u as indexAjaxData, bX as parseTemplePage, bY as displayDisconnectedFromGodsMessage } from './calfSystem-0ffc234f.js';

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
//# sourceMappingURL=injectTempleAlert-8f3b68c0.js.map
