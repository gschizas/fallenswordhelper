import calf from '../../support/calf';
import createDocument from '../../system/createDocument';
import displayDisconnectedFromGodsMessage
  from './displayDisconnectedFromGodsMessage';
import querySelector from '../../common/querySelector';
import saveTempleSettings from './saveTempleSettings';

function templeAlertEnabled(responseText) {
  var checkNeedToPray;
  var doc;
  if (calf.cmd !== 'temple') {
    doc = createDocument(responseText);
  } else {
    doc = document;
  }
  checkNeedToPray = querySelector('input[value="Pray to Osverin"]', doc);
  var needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  saveTempleSettings(needToPray);
}

export function parseTemplePage(responseText) {
  if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
}
