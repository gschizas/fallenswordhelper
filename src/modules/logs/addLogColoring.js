import getValue from '../system/getValue';
import {quickBuffHref} from '../support/layout';
import {
  findNode,
  parseDateAsTimestamp,
  setValue
} from '../system/system';

var nowUtc;
var lastCheckUtc;

function findChatTable() { // Legacy
  var chatTable = findNode('//table[@class="width_full"]'); // Guild Log
  if (!chatTable) {
    chatTable = findNode('//table[tbody/tr/td[.="Message"]]'); // Outbox & Guild Chat
  }
  if (!chatTable) {
    chatTable = findNode('//table[tbody/tr/td/span[' +
      'contains(.,"Currently showing:")]]'); // personal log
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

function rowColor(aRow, logScreen, dateColumn) { // Legacy
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
  var increment = 2;
  if (logScreen === 'Chat') {
    increment = 4;
    chatTable.classList.add('fshGc');
  }
  for (var i = 1; i < chatTable.rows.length; i += increment) {
    rowColor(chatTable.rows[i], logScreen, dateColumn);
  }
  setValue(lastCheckScreen, nowUtc);
}

export default function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!getValue('enableLogColoring')) {return;}
  var chatTable = findChatTable();
  if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
}
