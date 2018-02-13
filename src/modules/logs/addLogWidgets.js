import buffList from '../support/buffObj';
import calf from '../support/calf';
import fallback from '../system/fallback';
import findNode from '../system/findNode';
import getMembrList from '../ajax/getMembrList';
import getValue from '../system/getValue';
import jQueryNotPresent from '../common/jQueryNotPresent';
import myStats from '../ajax/myStats';
import processLadder from './processLadder';
import {quickBuffHref} from '../support/layout';
import {addPvpSummary, initCache} from './addPvpSummary';

var myPlayer = {};
var addAttackLinkToLog;
var memberNameString;
var listOfAllies;
var listOfEnemies;
var nickList;
var enableChatParsing;

function removeHTML(buffName) {
  return buffName.replace(/<\/?[^>]+(>|$)/g, '');
}

function reportIgnore(aRow, isGuildMate, playerName) { // Legacy
  var extraPart = '';
  var dateHTML = aRow.cells[1].innerHTML;
  var dateFirstPart = dateHTML
    .substring(0, dateHTML.indexOf('>Report') + 7);
  var dateLastPart = dateHTML
    .substring(dateHTML.indexOf('Message</a>') + 11, dateHTML.length);
  if (!isGuildMate) {
    extraPart = ' | <a title="Add to Ignore List" href="index.php?cmd' +
      '=log&subcmd=doaddignore&ignore_username=' + playerName +
      '">Ignore</a>';
  }
  aRow.cells[1].innerHTML = dateFirstPart + '</a>' + extraPart +
    dateLastPart;
}

function buildNickList() {// Native
  nickList = buffList.reduce(function(prev, curr) {
    var ret = prev;
    var nicks = curr.nicks.split(',');
    nicks.forEach(function(el) {
      var nick = el.toLowerCase();
      ret[nick] = curr.id;
    });
    return ret;
  }, {});
}

function doBuffLink(_buffsSent, targetPlayerID) { // Legacy
  var quickBuff = '';
  var buffsSent = _buffsSent[0].replace('`~', '').replace('~`', '')
    .split(/\s*,\s*/);
  buffsSent.reduce(function(prev, el) {
    var ret = prev;
    var nick = el.toLowerCase();
    if (nickList[nick]) {
      ret += nickList[nick].toString() + ';';
    }
    return ret;
  }, '');
  return ' | <a ' + quickBuffHref(targetPlayerID, quickBuff) +
      '>Buff</a></span>';
}

function getAttackPart(playerName) { // Legacy
  if (addAttackLinkToLog) {
    return ' | <a href="index.php?cmd=attackplayer&target_username=' +
      playerName + '">Attack</a>';
  }
  return '';
}

function isChat(aRow, isGuildMate, playerName) { // Legacy
  var extraPart = '';
  reportIgnore(aRow, isGuildMate, playerName);
  var messageHTML = aRow.cells[2].innerHTML;
  var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
    messageHTML.indexOf('>Buff</a>') + 9);
  var targetPlayerID = /quickBuff\((\d+)\)/.exec(thirdPart)[1];
  thirdPart = ' | <a ' + quickBuffHref(targetPlayerID) +
    '>Buff</a></span>';
  var fourthPart = messageHTML.substring(messageHTML
    .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'),
    messageHTML.length);
  extraPart = ' | <a href="index.php?cmd=trade&target_player=' + playerName +
    '">Trade</a> | <a title="Secure Trade" href="index.php?cmd=trade' +
    '&subcmd=createsecure&target_username=' + playerName + '">ST</a>';
  var attackPart = getAttackPart(playerName);
  var buffsSent = aRow.cells[2].innerHTML.match(/`~.*?~`/);
  if (buffsSent) {
    thirdPart = doBuffLink(buffsSent, targetPlayerID);
  }
  var replyTo = '';
  if (enableChatParsing) {
    replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
  }
  var msgReplyTo = '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' + playerName +
    '" replyTo="' + replyTo + '...">Reply</span>';
  aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
    extraPart + thirdPart + attackPart + fourthPart +
    '</nobr>' + lastPart;
}

function doChat(messageType, aRow, isGuildMate, playerName) { // Legacy
  if (messageType === 'Chat') {isChat(aRow, isGuildMate, playerName);}
}

function isEnemy(playerName, playerElement) { // Legacy
  if (listOfEnemies.indexOf(playerName) !== -1) {
    playerElement.style.color = 'red';
  }
}

function isAlly(playerName, playerElement) { // Legacy
  if (listOfAllies.indexOf(playerName) !== -1) {
    playerElement.style.color = 'blue';
  }
}

function playerColor(colorPlayerName, playerName, playerElement) { // Legacy
  if (!colorPlayerName) {return false;}
  if (memberNameString.indexOf(playerName) !== -1) {
    playerElement.style.color = 'green';
    return true;
  }
  isEnemy(playerName, playerElement);
  isAlly(playerName, playerElement);
  return false;
}

function addExtraStuff(aRow, playerName, isGuildMate) { // Legacy
  if (!isGuildMate) {
    var dateExtraText = '<nobr><span style="font-size:x-small;">' +
      '[ <a title="Add to Ignore List" href="index.php?cmd=log' +
      '&subcmd=doaddignore&ignore_username=' + playerName +
      '">Ignore</a> ]</span></nobr>';
    aRow.cells[1].innerHTML = aRow.cells[1].innerHTML + '<br>' +
      dateExtraText;
  }
  var buffingPlayerIDRE = /player_id=(\d+)/;
  var buffingPlayerID = buffingPlayerIDRE
    .exec(aRow.cells[2].innerHTML)[1];
  var buffingPlayerName = aRow.cells[2].firstChild.nextSibling
    .innerHTML;
  var extraText = ' <span style="font-size:x-small;"><nobr>' +
    '[ <span style="cursor:pointer;text-decoration:underline" ' +
    'class="a-reply" target_player="' + buffingPlayerName +
    '">Reply</span> | <a href="index.php?cmd=trade&target_player=' +
    buffingPlayerName + '">Trade</a> | <a title="Secure Trade" ' +
    'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
    buffingPlayerName + '">ST</a>';
  extraText += ' | <a ' + quickBuffHref(buffingPlayerID) +
    '>Buff</a>';
  if (addAttackLinkToLog) {
    extraText += ' | <a href="index.php?cmd=attackplayer' +
      '&target_username=' + buffingPlayerName + '">Attack</a>';
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
  addPvpSummary(aRow, messageType);
  processLadder(aRow, messageType);
}

function processLogWidgetRow(aRow) { // Legacy
  // Valid Types: General, Chat, Guild
  var messageType = aRow.cells[0].firstChild.getAttribute('oldtitle');
  if (messageType) {doLogWidgetRow(aRow, messageType);}
}

function foundLogTable(logTable) { // Legacy
  memberNameString = Object.keys(calf.membrList);
  listOfAllies = myPlayer._allies.map(function(obj) {
    return obj.username;
  });
  listOfEnemies = myPlayer._enemies.map(function(obj) {
    return obj.username;
  });
  calf.showPvPSummaryInLog = getValue('showPvPSummaryInLog');
  calf.lastLadderReset = getValue('lastLadderReset');
  enableChatParsing = getValue('enableChatParsing');
  var messageHeader = logTable.rows[0].cells[2];
  if (messageHeader) {
    messageHeader.insertAdjacentHTML('beforeend', '&nbsp;&nbsp;' +
      '<span class="fshWhite">(Guild mates show up in ' +
      '<span class="fshGreen">green</span>)</span>');
  }
  for (var i = 1; i < logTable.rows.length; i += 2) {
    processLogWidgetRow(logTable.rows[i]);
  }
  $('.a-reply').click(function(evt) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'),
      '', evt.target.getAttribute('replyTo'));
  });
}

function addLogWidgetsOld() { // Legacy
  buildNickList();
  addAttackLinkToLog = getValue('addAttackLinkToLog');
  var logTable = findNode('//table[tbody/tr/td/span[contains' +
    '(.,"Currently showing:")]]');
  if (logTable) {foundLogTable(logTable);}
}

export default function addLogWidgets() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  $.when(
    getMembrList(false),
    myStats(false).done(function(data) {
      myPlayer = data;
    }),
    initCache()
  ).done(addLogWidgetsOld);
}
