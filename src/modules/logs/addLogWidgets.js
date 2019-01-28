import calf from '../support/calf';
import doBuffLink from './doBuffLink';
import doChat from './doChat';
import fallback from '../system/fallback';
import getMembrList from '../ajax/getMembrList';
import getValue from '../system/getValue';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import myRows from '../common/myRows';
import myStats from '../ajax/myStats';
import processLadder from './processLadder';
import {addPvpSummary, initCache} from './addPvpSummary';
import {
  attackplayerUrl,
  doAddIgnore,
  secureUrl,
  tradeUrl
} from '../support/constants';
import {getKeys, playerColor, prepareAlliesEnemies} from './playerColour';

function getCalfVars() {
  calf.showPvPSummaryInLog = getValue('showPvPSummaryInLog');
  calf.lastLadderReset = getValue('lastLadderReset');
  calf.enableChatParsing = getValue('enableChatParsing');
}

function doMsgHeader(logTable) {
  var messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    insertHtmlBeforeEnd(messageHeader, '&nbsp;&nbsp;' +
      '<span class="fshWhite">(Guild mates show up in ' +
      '<span class="fshGreen">green</span>)</span>');
  }
}

function canIgnore(aRow, playerName, isGuildMate) {
  if (!isGuildMate) {
    var dateExtraText = '<nobr><span style="font-size:x-small;">' +
      '[ <a title="Add to Ignore List" href="' + doAddIgnore + playerName +
      '">Ignore</a> ]</span></nobr>';
    aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' +
      dateExtraText;
  }
}

function addExtraStuff(aRow, playerName, isGuildMate) { // Legacy
  canIgnore(aRow, playerName, isGuildMate);
  var buffingPlayerIDRE = /player_id=(\d+)/;
  var buffingPlayerID = buffingPlayerIDRE
    .exec(aRow.cells[2].innerHTML)[1];
  var buffingPlayerName = aRow.cells[2].firstChild.nextSibling
    .innerHTML;
  var extraText = ' <span style="font-size:x-small;"><nobr>' +
    '[ <span style="cursor:pointer;text-decoration:underline" ' +
    'class="a-reply" target_player="' + buffingPlayerName +
    '">Reply</span> | <a href="' + tradeUrl + buffingPlayerName +
    '">Trade</a> | <a title="Secure Trade" href="' + secureUrl +
    buffingPlayerName + '">ST</a>';
  extraText += doBuffLink(buffingPlayerID);
  if (calf.addAttackLinkToLog) {
    extraText += ' | <a href="' + attackplayerUrl + buffingPlayerName +
      '">Attack</a>';
  }
  extraText += ' ]</nobr></span>';

  aRow.cells[2].innerHTML += extraText;
}

function hasPlayerLink(aRow) {
  return aRow.cells[2].firstChild.nextSibling &&
    aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
    /player_id/.test(aRow.cells[2].firstChild.nextSibling.href);
}

function otherMsgType(aRow, messageType) {
  return fallback(messageType === 'General', messageType === 'Notification') &&
    hasPlayerLink(aRow);
}

function doExtraStuff(aRow, messageType, playerName, isGuildMate) {
  if (messageType === 'Notification' &&
      hasPlayerLink(aRow)) {
    addExtraStuff(aRow, playerName, isGuildMate);
  }
}

function doLogWidgetRow(aRow, messageType) { // Legacy
  var playerElement;
  var playerName;
  var colorPlayerName = false;
  if (messageType === 'Chat') {
    playerElement = aRow.cells[2].firstChild;
    playerName = playerElement.innerHTML;
    colorPlayerName = true;
  }
  if (otherMsgType(aRow, messageType)) {
    playerElement = aRow.cells[2].firstChild.nextSibling;
    playerName = playerElement.innerHTML;
    colorPlayerName = true;
  }
  var isGuildMate = playerColor(colorPlayerName, playerName, playerElement);
  doChat(messageType, aRow, isGuildMate, playerName);
  doExtraStuff(aRow, messageType, playerName, isGuildMate);
}

function processLogWidgetRow(aRow) { // Legacy
  // Valid Types: General, Chat, Guild
  var messageType = aRow.cells[0].firstChild.getAttribute('oldtitle');
  if (messageType) {
    doLogWidgetRow(aRow, messageType);
    addPvpSummary(aRow, messageType);
    processLadder(aRow, messageType);
  }
}

function processTableRows(logTable) {
  Array.from(logTable.rows).filter(myRows(3, 0)).forEach(processLogWidgetRow);
}

function openMsgDialog(evt) {
  window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
    '', evt.target.getAttribute('replyTo'));
}

function foundLogTable(logTable) { // Legacy
  getCalfVars();
  doMsgHeader(logTable);
  processTableRows(logTable);
  $('.a-reply').click(openMsgDialog);
}

function addLogWidgetsOld() { // Legacy
  calf.addAttackLinkToLog = getValue('addAttackLinkToLog');
  var logTable = document.querySelector('#pCC > table:last-of-type');
  if (logTable) {foundLogTable(logTable);}
}

export default function addLogWidgets() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  $.when(
    getMembrList(false).done(getKeys),
    myStats(false).done(prepareAlliesEnemies),
    initCache()
  ).done(addLogWidgetsOld);
}
