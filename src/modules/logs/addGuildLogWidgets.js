import * as layout from '../support/layout';
import * as system from '../support/system';

var playerId;

function getPlayer(playerAry) { // Legacy
  if (playerAry) {return Number(playerAry[1]);}
  return 0;
}

function findPlayers(aRow) { // Legacy
  var messageHTML = aRow.cells[2].innerHTML;
  var doublerPlayerMessageRE =
    /member\s<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
  var singlePlayerMessageRE =
    /<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var firstPlayer = singlePlayerMessageRE.exec(messageHTML);

  var firstPlayerID = getPlayer(firstPlayer);
  var secondPlayerID = getPlayer(secondPlayer);

  if (firstPlayer && firstPlayerID !== playerId &&
      secondPlayerID !== playerId) {
    for (var j = 0; j < 3; j += 1) {
      aRow.cells[j].removeAttribute('class');
    }
    aRow.classList.add('fshGrey');
    aRow.classList.add('fshXXSmall');
  }
}

function likeInvite(aRow, hasInvited) { // Legacy
  var message = aRow.cells[2].innerHTML;
  var firstQuote = message.indexOf('\'');
  var firstPart = '';
  firstPart = message.substring(0, firstQuote);
  var secondQuote = message.indexOf('\'', firstQuote + 1);
  var targetPlayerName = message.substring(firstQuote + 1, secondQuote);
  aRow.cells[2].innerHTML = firstPart + '\'' +
    '<a href="index.php?cmd=findplayer&search_active=1&' +
    'search_level_max=&search_level_min=&search_username=' +
    targetPlayerName + '&search_show_first=1">' + targetPlayerName +
    '</a>' + message.substring(secondQuote, message.length);
  if (!hasInvited &&
    targetPlayerName !== layout.playerName()) {
    $(aRow).find('td').removeClass('row').css('font-size', 'xx-small');
    aRow.style.color = 'gray';
  }
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

function getMessageHeader() { // Native
  var nodeList = layout.pCC.getElementsByTagName('TD');
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

  playerId = layout.playerId();

  for (var i = 1; i < logTable.rows.length; i += 2) {
    var aRow = logTable.rows[i];
    processGuildWidgetRow(aRow);
  }
}

export default function addGuildLogWidgets() { // Legacy
  if (system.getValue('hideNonPlayerGuildLogMessages')) {
    guildLogWidgetsEnabled();
  }
}
