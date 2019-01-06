import getValue from '../system/getValue';
import myRows from '../common/myRows';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import partial from '../common/partial';
import quickBuffHref from '../common/quickBuffHref';
import setValue from '../system/setValue';

var nowUtc;
var lastCheckUtc;

function findChatTable() {
  var chatTable = document.querySelector('#pCC table table table table'); // Guild Chat
  if (!chatTable) {
    chatTable = document.querySelector('#pCC > table:last-of-type'); // Outbox, Guild Log & personal log
  }
  return chatTable;
}

function isOldRow(postAgeMins, postDateUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function chatRowBuffLink(aRow, logScreen, addBuffTag) { // Legacy
  if (logScreen === 'Chat' && addBuffTag) {
    var playerIDRE = /player_id=(\d+)/;
    var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
    aRow.cells[1].innerHTML += ' <a class="fshBf" ' +
      quickBuffHref(playerID) + '>[b]</a>';
  }
}

function rowColor(logScreen, dateColumn, aRow) { // Legacy
  var addBuffTag = true;
  var cellContents = aRow.cells[dateColumn].textContent;
  var postDateUtc = parseDateAsTimestamp(cellContents);
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
  Array.from(chatTable.rows).filter(myRows(3, 0))
    .forEach(partial(rowColor, logScreen, dateColumn));
  setValue(lastCheckScreen, nowUtc);
}

export default function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!getValue('enableLogColoring')) {return;}
  var chatTable = findChatTable();
  if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
}
