import calf from '../support/calf';
import createDocument from '../system/createDocument';
import displayDisconnectedFromGodsMessage
  from './displayDisconnectedFromGodsMessage';
import setValue from '../system/setValue';

function templeAlertEnabled(responseText) {
  var checkNeedToPray;
  var doc;
  if (calf.cmd !== 'temple') {
    doc = createDocument(responseText);
  } else {
    doc = document;
  }
  checkNeedToPray = doc.querySelector('input[value="Pray to Osverin"]');
  var needToPray = false;
  if (checkNeedToPray) {
    displayDisconnectedFromGodsMessage();
    needToPray = true;
  }
  setValue('needToPray', needToPray);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // midnight
}

export function parseTemplePage(responseText) {
  if (calf.enableTempleAlert) {templeAlertEnabled(responseText);}
}
