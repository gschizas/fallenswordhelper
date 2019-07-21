import {arrayFrom} from '../common/arrayFrom';
import contains from '../common/contains';
import {dataRows} from '../common/dataRows';
import getArrayByTagName from '../common/getArrayByTagName';
import getText from '../common/getText';
import getValue from '../system/getValue';
import {pCC} from '../support/layout';
import playerId from '../common/playerId';
import playerName from '../common/playerName';
import searchPlayerHref from '../common/searchPlayerHref';

function getPlayer(playerAry) { // Legacy
  if (playerAry) {return Number(playerAry[1]);}
  return 0;
}

function msgDoesNotIncludePlayer(aRow) {
  var messageHTML = aRow.cells[2].innerHTML;
  var doublerPlayerMessageRE =
    /member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/;
  var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
  var singlePlayerMessageRE =
    /<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/;
  var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
  var firstPlayerID = getPlayer(firstPlayer);
  var secondPlayerID = getPlayer(secondPlayer);
  return firstPlayer &&
    firstPlayerID !== playerId() &&
    secondPlayerID !== playerId();
}

function stripClassName(el) {el.className = '';}

function findPlayers(aRow) { // Legacy
  if (msgDoesNotIncludePlayer(aRow)) {
    arrayFrom(aRow.cells).forEach(stripClassName);
    aRow.classList.add('fshGrey');
    aRow.classList.add('fshXSmall');
  }
}

function dimIfNotMe(aRow, hasInvited, targetPlayerName) {
  if (!hasInvited && targetPlayerName !== playerName()) {
    $(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
    aRow.style.color = 'gray';
  }
}

function likeInvite(aRow, hasInvited) {
  var message = aRow.cells[2].innerHTML;
  var parts = message.split('\'');
  var targetPlayerName = parts[1];
  parts[1] = searchPlayerHref(targetPlayerName);
  aRow.cells[2].innerHTML = parts.join('\'');
  dimIfNotMe(aRow, hasInvited, targetPlayerName);
}

function guildInvite(aRow) { // Legacy
  var msg = getText(aRow.cells[2]);
  var hasInvited = msg.includes('has invited the player');
  if (msg.charAt(0) === '\'' || hasInvited) {
    likeInvite(aRow, hasInvited);
  }
}

function processGuildWidgetRow(aRow) { // Legacy
  findPlayers(aRow);
  guildInvite(aRow);
}

function getMessageHeader() {
  return getArrayByTagName('td', pCC).find(contains('Message'));
}

function guildLogWidgetsEnabled() { // Legacy
  var messageNameCell = getMessageHeader();
  if (!messageNameCell) {return;}
  var logTable = messageNameCell.parentNode.parentNode.parentNode;
  messageNameCell.innerHTML += '&nbsp;&nbsp;<span class="fshWhite">' +
    '(Guild Log messages not involving self are dimmed!)</span>';
  dataRows(logTable.rows, 3, 0).forEach(processGuildWidgetRow);
}

export default function addGuildLogWidgets() {
  if (getValue('hideNonPlayerGuildLogMessages')) {
    guildLogWidgetsEnabled();
  }
}
