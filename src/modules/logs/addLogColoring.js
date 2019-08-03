import {dataRows} from '../common/dataRows';
import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import partial from '../common/partial';
import {playerIDRE} from '../support/constants';
import querySelector from '../common/querySelector';
import quickBuffHref from '../common/quickBuffHref';
import setValue from '../system/setValue';

var nowUtc;
var lastCheckUtc;

function findChatTable() {
  var chatTable = querySelector('#pCC table table table table'); // Guild Chat
  if (!chatTable) {
    chatTable = querySelector('#pCC > table:last-of-type'); // Outbox, Guild Log & personal log
  }
  return chatTable;
}

function isOldRow(postAgeMins, postDateUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function doBuffLink(aRow) {
  const playerAnchor = playerIDRE.exec(aRow.cells[1].innerHTML);
  if (playerAnchor) {
    var playerID = playerAnchor[1];
    aRow.cells[1].innerHTML += ' <a class="fshBf" ' +
      quickBuffHref(playerID) + '>[b]</a>';
  }
}

function chatRowBuffLink(aRow, logScreen, addBuffTag) { // Legacy
  if (logScreen === 'Chat' && addBuffTag) {
    doBuffLink(aRow);
  }
}

function rowColor(logScreen, dateColumn, aRow) { // Legacy
  var addBuffTag = true;
  var postDateUtc = parseDateAsTimestamp(getTextTrim(aRow.cells[dateColumn]));
  var postAgeMins = (nowUtc - postDateUtc) / (1000 * 60);
  if (postDateUtc > lastCheckUtc) {
    aRow.classList.add('fshNr');
  } else if (isOldRow(postAgeMins, postDateUtc)) {
    aRow.classList.add('fshOr');
    addBuffTag = false;
  }
  chatRowBuffLink(aRow, logScreen, addBuffTag);
}

function getLastCheck(lastCheckScreen) {
  return getValue(lastCheckScreen) || nowUtc;
}

function doLogColoring(logScreen, dateColumn, chatTable) { // Legacy
  nowUtc = (new Date()).setUTCSeconds(0, 0) - 1;
  var lastCheckScreen = 'last' + logScreen + 'Check';
  lastCheckUtc = getLastCheck(lastCheckScreen);
  dataRows(chatTable.rows, 3, 0)
    .forEach(partial(rowColor, logScreen, dateColumn));
  setValue(lastCheckScreen, nowUtc);
}

export default function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!getValue('enableLogColoring')) {return;}
  var chatTable = findChatTable();
  if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
}
