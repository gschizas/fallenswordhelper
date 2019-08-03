import addPvpSummary from './pvpSummary/addPvpSummary';
import allthen from '../common/allthen';
import calf from '../support/calf';
import currentGuildId from '../common/currentGuildId';
import {dataRows} from '../common/dataRows';
import doBuffLink from './doBuffLink';
import doChat from './doChat';
import getCalfPrefs from '../common/getCalfPrefs';
import getMembrList from '../ajax/getMembrList';
import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import {initCache} from './pvpSummary/combatCache';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import myStats from '../ajax/myStats';
import processLadder from './processLadder';
import querySelector from '../common/querySelector';
//#if _DEV  //  arena Combat
import viewCombat from './viewCombat';
//#endif
import {
  attackplayerUrl,
  doAddIgnore,
  playerIDRE,
  secureUrl,
  tradeUrl
} from '../support/constants';
import {getKeys, playerColor, prepareAlliesEnemies} from './playerColour';

function getCalfVars() {
  [
    'showPvPSummaryInLog',
    'lastLadderReset',
    'enableChatParsing'
  ].forEach(getCalfPrefs);
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
  var buffingPlayerID = playerIDRE
    .exec(aRow.cells[2].innerHTML)[1];
  var buffingPlayerName = getTextTrim(aRow.cells[2].children[0]);
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
  return aRow.cells[2].children[0] &&
    aRow.cells[2].children[0].nodeName === 'A' &&
    /player_id/.test(aRow.cells[2].children[0].href);
}

function doExtraStuff(aRow, messageType, playerName, isGuildMate) {
  if (messageType === 'Notification' && hasPlayerLink(aRow)) {
    addExtraStuff(aRow, playerName, isGuildMate);
  }
}

function doLogWidgetRow(aRow, messageType) { // Legacy
  var playerElement;
  var playerName;
  var colorPlayerName = false;
  if (hasPlayerLink(aRow)) {
    playerElement = aRow.cells[2].children[0];
    playerName = getTextTrim(playerElement);
    colorPlayerName = true;
  }
  var isGuildMate = playerColor(colorPlayerName, playerName, playerElement);
  doChat(messageType, aRow, isGuildMate, playerName);
  doExtraStuff(aRow, messageType, playerName, isGuildMate);
}

function processLogWidgetRow(aRow) { // Legacy
  var messageType = aRow.cells[0].children[0].getAttribute('oldtitle');
  if (messageType) {
    doLogWidgetRow(aRow, messageType);
    addPvpSummary(aRow, messageType);
    processLadder(aRow, messageType);
    //#if _DEV  //  arena Combat
    viewCombat(aRow);
    //#endif
  }
}

function processTableRows(logTable) {
  dataRows(logTable.rows, 3, 0).forEach(processLogWidgetRow);
}

function openMsgDialog(evt) {
  window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
    '', evt.target.getAttribute('replyTo'));
}

function foundLogTable(logTable) { // Legacy
  getCalfVars();
  doMsgHeader(logTable);
  processTableRows(logTable);
  $('.a-reply').on('click', openMsgDialog);
}

function addLogWidgetsOld() { // Legacy
  calf.addAttackLinkToLog = getValue('addAttackLinkToLog');
  var logTable = querySelector('#pCC > table:last-of-type');
  if (logTable) {foundLogTable(logTable);}
}

export default function addLogWidgets() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  var prm = [
    myStats(false).then(prepareAlliesEnemies),
    initCache()
  ];
  if (currentGuildId()) {prm.push(getMembrList(false).then(getKeys));}
  allthen(prm, addLogWidgetsOld);
}
