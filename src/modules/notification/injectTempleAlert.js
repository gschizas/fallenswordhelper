import calf from '../support/calf';
import displayDisconnectedFromGodsMessage
  from './displayDisconnectedFromGodsMessage';
import {getValue} from '../system/system';
import {now} from '../support/dataObj';
import {parseTemplePage} from './parseTemplePage';
import retryAjax from '../ajax/retryAjax';

function checkLastUpdate(templeAlertLastUpdate) {
  return !templeAlertLastUpdate || now > templeAlertLastUpdate;
}

function doWeNeedToParse() {
  if (checkLastUpdate(getValue('lastTempleCheck'))) {return true;}
  if (getValue('needToPray')) {
    displayDisconnectedFromGodsMessage();
  }
  return false;
}

export default function injectTempleAlert() { // jQuery
  // Checks to see if the temple is open for business.
  if (calf.cmd === 'temple') {return;}
  if (doWeNeedToParse()) {
    retryAjax('index.php?no_mobile=1&cmd=temple').done(parseTemplePage);
  }
}
