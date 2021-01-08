import calf from '../../support/calf';
import displayDisconnectedFromGodsMessage
  from './displayDisconnectedFromGodsMessage';
import getValue from '../../system/getValue';
import indexAjaxData from '../../ajax/indexAjaxData';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import { now } from '../../support/now';
import parseTemplePage from './parseTemplePage';

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

export default function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple' || jQueryNotPresent()) { return; }
  doWeNeedToParse();
}
