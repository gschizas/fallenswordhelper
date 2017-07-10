import * as layout from '../support/layout';
import * as system from '../support/system';

var nowUtc;
var lastCheckUtc;

function findChatTable() { // Legacy
  var chatTable = system.findNode('//table[@class="width_full"]'); // Guild Log
  if (!chatTable) {
    chatTable = system.findNode('//table[tbody/tr/td[.="Message"]]'); // Outbox & Guild Chat
  }
  if (!chatTable) {
    chatTable = system.findNode('//table[tbody/tr/td/span[' +
      'contains(.,"Currently showing:")]]'); // personal log
  }
  return chatTable;
}

function chatRowBuffLink(aRow, logScreen, addBuffTag) { // Legacy
  if (logScreen === 'Chat' && addBuffTag) {
    var playerIDRE = /player_id=(\d+)/;
    var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
    aRow.cells[1].innerHTML += ' <a class="fshBf" ' +
      layout.quickBuffHref(playerID) + '>[b]</a>';
  }
}

function rowColor(aRow, logScreen, dateColumn) { // Legacy
  var addBuffTag = true;
  var cellContents = aRow.cells[dateColumn].textContent;
  var postDateUtc = system.parseDateAsTimestamp(cellContents);
  var postAgeMins = (nowUtc - postDateUtc) / (1000 * 60);
  if (postDateUtc > lastCheckUtc) {
    aRow.classList.add('fshNr');
  } else if (postAgeMins > 20 && postDateUtc <= lastCheckUtc) {
    aRow.classList.add('fshOr');
    addBuffTag = false;
  }
  chatRowBuffLink(aRow, logScreen, addBuffTag);
}

function getLastCheck(lastCheckScreen) {
  return system.getValue(lastCheckScreen) || nowUtc;
}

function doLogColoring(logScreen, dateColumn, chatTable) { // Legacy
  nowUtc = (new Date()).getTime();
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
  system.setValue(lastCheckScreen, Date.now());
}

export default function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!system.getValue('enableLogColoring')) {return;}
  var chatTable = findChatTable();
  if (chatTable) {doLogColoring(logScreen, dateColumn, chatTable);}
}
