import getValue from '../system/getValue';
import {pCC} from '../support/layout';
import playerId from '../common/playerId';
import playerName from '../common/playerName';

var currentPlayerId;

function getPlayer(playerAry) { // Legacy
  if (playerAry) {return Number(playerAry[1]);}
  return 0;
}

function msgDoesNotIncludePlayer(aRow) {
  var messageHTML = aRow.cells[2].innerHTML;
  var doublerPlayerMessageRE =
    /member\s<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
  var singlePlayerMessageRE =
    /<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var firstPlayer = singlePlayerMessageRE.exec(messageHTML);
  var firstPlayerID = getPlayer(firstPlayer);
  var secondPlayerID = getPlayer(secondPlayer);
  return firstPlayer &&
    firstPlayerID !== currentPlayerId &&
    secondPlayerID !== currentPlayerId;
}

function findPlayers(aRow) { // Legacy
  if (msgDoesNotIncludePlayer(aRow)) {
    for (var j = 0; j < 3; j += 1) {
      aRow.cells[j].removeAttribute('class');
    }
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

function searchPlayerHref(targetPlayerName) {
  return '<a href="index.php?cmd=findplayer&search_active=1&' +
    'search_level_max=&search_level_min=&search_username=' +
    targetPlayerName + '&search_show_first=1">' + targetPlayerName + '</a>';
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
  var hasInvited = aRow.cells[2].textContent
    .search('has invited the player') !== -1;
  if (aRow.cells[2].textContent.charAt(0) === '\'' || hasInvited) {
    likeInvite(aRow, hasInvited);
  }
}

function processGuildWidgetRow(aRow) { // Legacy
  findPlayers(aRow);
  guildInvite(aRow);
}

function getMessageHeader() {
  var nodeList = pCC.getElementsByTagName('TD');
  for (var i = 0; i < nodeList.length; i += 1) {
    if (nodeList[i].textContent === 'Message') {
      return nodeList[i];
    }
  }
}

function guildLogWidgetsEnabled() { // Legacy
  var messageNameCell = getMessageHeader();
  if (!messageNameCell) {return;}
  var logTable = messageNameCell.parentNode.parentNode.parentNode;
  messageNameCell.innerHTML += '&nbsp;&nbsp;<span class="fshWhite">' +
    '(Guild Log messages not involving self are dimmed!)</span>';

  currentPlayerId = playerId();

  for (var i = 1; i < logTable.rows.length; i += 2) {
    var aRow = logTable.rows[i];
    processGuildWidgetRow(aRow);
  }
}

export default function addGuildLogWidgets() {
  if (getValue('hideNonPlayerGuildLogMessages')) {
    guildLogWidgetsEnabled();
  }
}
