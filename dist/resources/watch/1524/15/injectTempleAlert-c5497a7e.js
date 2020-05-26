import { c as calf, w as jQueryNotPresent, aA as now, D as getValue, t as indexAjaxData, cb as parseTemplePage, cc as displayDisconnectedFromGodsMessage } from './calfSystem-b469667c.js';

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
//# sourceMappingURL=injectTempleAlert-c5497a7e.js.map
