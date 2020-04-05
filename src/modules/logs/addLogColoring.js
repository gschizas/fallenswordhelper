import { dataRows } from '../common/dataRows';
import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import onclick from '../common/onclick';
import openQuickBuffByName from '../common/openQuickBuffByName';
import parseDateAsTimestamp from '../system/parseDateAsTimestamp';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import setValue from '../system/setValue';

let nowUtc;
let lastCheckUtc;

function findChatTable() {
  let chatTable = querySelector('#pCC table table table table'); // Guild Chat
  if (!chatTable) {
    chatTable = querySelector('#pCC > table:last-of-type'); // Outbox, Guild Log & personal log
  }
  return chatTable;
}

function isOldRow(postAgeMins, postDateUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function doBuffLink(aRow) {
  insertHtmlBeforeEnd(aRow.cells[1],
    ' <button class="fshBl fshBls">[b]</button>');
}

function chatRowBuffLink(aRow, logScreen, addBuffTag) { // Legacy
  if (logScreen === 'Chat' && addBuffTag) {
    doBuffLink(aRow);
  }
}

function rowColor(logScreen, dateColumn, aRow) { // Legacy
  let addBuffTag = true;
  const postDateUtc = parseDateAsTimestamp(getTextTrim(aRow.cells[dateColumn]));
  const postAgeMins = (nowUtc - postDateUtc) / (1000 * 60);
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

const isBuffLink = (target) => target.classList.contains('fshBl') && target.previousElementSibling;

function handleClick(e) {
  if (isBuffLink(e.target)) {
    openQuickBuffByName(getTextTrim(e.target.previousElementSibling));
  }
}

function doLogColoring(logScreen, dateColumn, chatTable) { // Legacy
  nowUtc = new Date().setUTCSeconds(0, 0) - 1;
  const lastCheckScreen = `last${logScreen}Check`;
  lastCheckUtc = getLastCheck(lastCheckScreen);
  dataRows(chatTable.rows, 3, 0)
    .forEach(partial(rowColor, logScreen, dateColumn));
  onclick(chatTable, handleClick);
  setValue(lastCheckScreen, nowUtc);
}

export default function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!getValue('enableLogColoring')) { return; }
  const chatTable = findChatTable();
  if (chatTable) { doLogColoring(logScreen, dateColumn, chatTable); }
}
