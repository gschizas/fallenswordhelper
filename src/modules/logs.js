import calf from './support/calf';
import * as ajax from './support/ajax';
import * as buffObj from './support/buffObj';
import * as layout from './support/layout';
import * as system from './support/system';

var myPlayer = {};
var addAttackLinkToLog;
var memberNameString;
var listOfAllies;
var listOfEnemies;
var showPvPSummaryInLog;
var playerId;

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

export function addLogColoring(logScreen, dateColumn) { // Legacy
  if (!system.getValue('enableLogColoring')) {return;}
  var chatTable = findChatTable();
  if (!chatTable) {return;}

  var nowUtc = (new Date()).getTime();
  var lastCheckScreen = 'last' + logScreen + 'Check';
  var lastCheckUtc = system.getValue(lastCheckScreen) || nowUtc;

  var increment = 2;
  if (logScreen === 'Chat') {
    increment = 4;
    chatTable.classList.add('fshGc');
  }
  for (var i = 1; i < chatTable.rows.length; i += increment) {
    var aRow = chatTable.rows[i];
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
    if (logScreen === 'Chat' && addBuffTag) {
      var playerIDRE = /player_id=(\d+)/;
      var playerID = playerIDRE.exec(aRow.cells[1].innerHTML)[1];
      aRow.cells[1].innerHTML += ' <a class="fshBf" ' +
        layout.quickBuffHref(playerID) + '>[b]</a>';
    }
  }
  system.setValue(lastCheckScreen, Date.now());
}

function addChatTextArea() { // jQuery
  if (!system.getValue('enhanceChatTextEntry')) {return;}
  $('#pCC form').first().attr('id', 'dochat');
  $('#pCC input').slice(0, 7).each(function() {
    $(this).attr('form', 'dochat');
  });
  var theTable = $('#pCC table table').first();
  theTable.append('<tr id="fshMass"></tr>');
  $('td', theTable).eq(0).remove();
  var btnMass = $('input[value="Send As Mass"]', theTable);
  if (btnMass.length === 1) {
    btnMass.appendTo('#fshMass', theTable);
  }
  var ourTd = $('td', theTable).eq(0);
  ourTd.attr('rowspan', '2');
  $('input', ourTd).replaceWith('<textarea id="fshTxt" name="msg" cols' +
    '="72" rows="2" form="dochat" style="resize: none"></textarea>');
  var fshTxt = $('#fshTxt', ourTd);
  fshTxt.keydown(function(e) {
    if (e.keyCode === 13 && fshTxt.val() !== '') {
      $('input[value=Send]', theTable).click();
      return false;
    }
  });
}

function removeHTML(buffName) { // Native
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

function doBuffLink(_buffsSent, targetPlayerID) { // Legacy
  var buffList = buffObj.buffList;
  var quickBuff = '';
  var buffsSent = _buffsSent[0].replace('`~', '').replace('~`', '').split(',');
  for (var j = 0; j < buffsSent.length; j += 1) {
    for (var m = 0; m < buffList.length; m += 1) {
      var nicks = buffList[m].nicks.split(',');
      var exitOuter = false;
      for (var k = 0; k < nicks.length; k += 1) {
        if (buffsSent[j].toLowerCase().trim() ===
            nicks[k].toLowerCase().trim()) {
          quickBuff += m + ';';
          exitOuter = true;
          break;
        }
      }
      if (exitOuter) {
        break;
      }
    }
  }
  return ' | <a ' + layout.quickBuffHref(targetPlayerID, quickBuff) +
      '>Buff</a></span>';
}

function doChat(aRow, isGuildMate, playerName) { // Legacy
  var extraPart = '';

  reportIgnore(aRow, isGuildMate, playerName);

  var messageHTML = aRow.cells[2].innerHTML;
  var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
    messageHTML.indexOf('>Buff</a>') + 9);
  var targetPlayerID = /quickBuff\((\d+)\)/.exec(thirdPart)[1];
  thirdPart = ' | <a ' + layout.quickBuffHref(targetPlayerID) +
    '>Buff</a></span>';
  var fourthPart = messageHTML.substring(messageHTML
    .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'),
    messageHTML.length);
  extraPart = ' | <a href="index.php?cmd=trade&target_player=' + playerName +
    '">Trade</a> | <a title="Secure Trade" href="index.php?cmd=trade' +
    '&subcmd=createsecure&target_username=' + playerName + '">ST</a>';

  var attackPart = '';
  if (addAttackLinkToLog) {
    attackPart = ' | <a href="index.php?cmd=attackplayer&target_username=' +
      playerName + '">Attack</a>';
  }

  var buffsSent = aRow.cells[2].innerHTML.match(/`~.*?~`/);
  if (buffsSent) {
    thirdPart = doBuffLink(buffsSent, targetPlayerID);
  }

  var msgReplyTo = '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' +
    playerName + '" replyTo="' +
    (system.getValue('enableChatParsing') ?
    removeHTML(firstPart.replace(/&nbsp;/g, ' '))
    .substr(0, 140) : '') + '...">Reply</span>';
  aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
    extraPart + thirdPart + attackPart + fourthPart +
    '</nobr>' + lastPart;
}

function pvpXp(color, xpGain) { // Legacy
  var out = '';
  if (xpGain !== 0) {
    out = 'XP stolen:<span class="' + color + '">' +
      system.addCommas(xpGain) + ' </span>';
  }
  return out;
}

function pvpGoldGain(color, goldGain) { // Legacy
  var out = '';
  if (goldGain !== 0) {
    out = 'Gold lost:<span class="' + color + '">' +
      system.addCommas(goldGain) + ' </span>';
  }
  return out;
}

function pvpGoldStolen(color, goldStolen) { // Legacy
  var out = '';
  if (goldStolen !== 0) {
    out = 'Gold stolen:<span class="' + color + '">' +
      system.addCommas(goldStolen) + ' </span>';
  }
  return out;
}

function pvpPrestigeGain(color, prestigeGain) { // Legacy
  var out = '';
  if (prestigeGain !== 0) {
    out = 'Prestige gain:<span class="' + color + '">' +
      prestigeGain + ' </span>';
  }
  return out;
}

function pvpRating(color, pvpRatingChange) { // Legacy
  var out = '';
  if (pvpRatingChange !== 0) {
    out = 'PvP change:<span class="' + color + '">' +
    pvpRatingChange + ' </span>';
  }
  return out;
}

function retrievePvPCombatSummary(responseText, callback) { // Legacy
  var winner = callback.winner;
  var color;
  if (winner === 1) {
    color = 'fshGreen';
  } else {
    color = 'fshRed';
  }
  var xpGain = system.getIntFromRegExp(responseText,
    /var\s+xpGain=(-?[0-9]+);/i);
  var goldGain = system.getIntFromRegExp(responseText,
    /var\s+goldGain=(-?[0-9]+);/i);
  var prestigeGain = system.getIntFromRegExp(responseText,
    /var\s+prestigeGain=(-?[0-9]+);/i);
  var goldStolen = system.getIntFromRegExp(responseText,
    /var\s+goldStolen=(-?[0-9]+);/i);
  var pvpRatingChange = system.getIntFromRegExp(responseText,
    /var\s+pvpRatingChange=(-?[0-9]+);/i);
  var output = '<br> ';
  output += pvpXp(color, xpGain);
  output += pvpGoldGain(color, goldGain);
  output += pvpGoldStolen(color, goldStolen);
  output += pvpPrestigeGain(color, prestigeGain);
  output += pvpRating(color, pvpRatingChange);
  callback.target.innerHTML = output;
}

function addPvpSummary(aRow, messageType) { // Legacy
  // add PvP combat log summary
  if (messageType === 'Combat' &&
      aRow.cells[2] &&
      showPvPSummaryInLog &&
      aRow.cells[2].innerHTML.search('combat_id=') !== -1) {
    var combatID = /combat_id=(\d+)/.exec(aRow.cells[2].innerHTML)[1];
    var defeat = /You were defeated by/.exec(aRow.cells[2].innerHTML);
    var combatSummarySpan = document.createElement('SPAN');
    combatSummarySpan.style.color = 'gray';
    aRow.cells[2].appendChild(combatSummarySpan);
    system.xmlhttp('index.php?cmd=combat&subcmd=view&combat_id=' +
      combatID, retrievePvPCombatSummary,
      {
        target: combatSummarySpan,
        winner: defeat ? 0 : 1
      });
  }
}

function playerColor(playerName, playerElement) { // Legacy
  var isGuildMate = false;
  if (memberNameString.indexOf(playerName) !== -1) {
    playerElement.style.color = 'green';
    isGuildMate = true;
  }
  if (listOfEnemies.indexOf(playerName) !== -1) {
    playerElement.style.color = 'red';
  }
  if (listOfAllies.indexOf(playerName) !== -1) {
    playerElement.style.color = 'blue';
  }
  return isGuildMate;
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
  extraText += ' | <a ' + layout.quickBuffHref(buffingPlayerID) +
    '>Buff</a>';
  if (addAttackLinkToLog) {
    extraText += ' | <a href="index.php?cmd=attackplayer' +
      '&target_username=' + buffingPlayerName + '">Attack</a>';
  }
  extraText += ' ]</nobr></span>';

  aRow.cells[2].innerHTML += extraText;
}

function processLogWidgetRow(aRow) { // Legacy
  var playerElement;
  var playerName;
  var firstCell = aRow.cells[0];
  // Valid Types: General, Chat, Guild
  var messageType = firstCell.firstChild.getAttribute('oldtitle');
  if (!messageType) {return;}
  var colorPlayerName = false;
  var isGuildMate = false;
  if (messageType === 'Chat') {
    playerElement = aRow.cells[2].firstChild;
    playerName = playerElement.innerHTML;
    colorPlayerName = true;
  }
  if ((messageType === 'General' ||
      messageType === 'Notification') &&
      aRow.cells[2].firstChild.nextSibling &&
      aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
      aRow.cells[2].firstChild.nextSibling.getAttribute('href')
        .search('player_id') !== -1) {
    playerElement = aRow.cells[2].firstChild.nextSibling;
    playerName = playerElement.innerHTML;
    colorPlayerName = true;
  }
  if (colorPlayerName) {
    isGuildMate = playerColor(playerName, playerElement);
  }
  if (messageType === 'Chat') {
    doChat(aRow, isGuildMate, playerName);
  }
  if (messageType === 'Notification' &&
      aRow.cells[2].firstChild.nextSibling &&
      aRow.cells[2].firstChild.nextSibling.nodeName === 'A' &&
      aRow.cells[2].firstChild.nextSibling
      .getAttribute('href').search('player_id') !== -1) {
    addExtraStuff(aRow, playerName, isGuildMate);
  }
  addPvpSummary(aRow, messageType);
}

function addLogWidgetsOld() { // Legacy
  addAttackLinkToLog = system.getValue('addAttackLinkToLog');
  var logTable = system.findNode('//table[tbody/tr/td/span[contains' +
    '(.,"Currently showing:")]]');
  if (!logTable) {return;}
  memberNameString = Object.keys(calf.membrList);
  listOfAllies = myPlayer._allies.map(function(obj) {
    return obj.username;
  });
  listOfEnemies = myPlayer._enemies.map(function(obj) {
    return obj.username;
  });
  showPvPSummaryInLog = system.getValue('showPvPSummaryInLog');
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

function addLogWidgets() { // jQuery
  $.when(
    ajax.getMembrList(false),
    ajax.myStats(false).done(function(data) {
      myPlayer = data;
    })
  ).done(addLogWidgetsOld);
}

function processGuildWidgetRow(aRow) { // Legacy
  var messageHTML = aRow.cells[2].innerHTML;
  var doublerPlayerMessageRE =
    /member\s<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var secondPlayer = doublerPlayerMessageRE.exec(messageHTML);
  var singlePlayerMessageRE =
    /<a\shref="index.php\?cmd=profile&amp;player_id=(\d+)/;
  var firstPlayer = singlePlayerMessageRE.exec(messageHTML);

  var firstPlayerID = firstPlayer ? Number(firstPlayer[1]) : 0;
  var secondPlayerID = secondPlayer ? Number(secondPlayer[1]) : 0;

  if (firstPlayer && firstPlayerID !== playerId &&
      secondPlayerID !== playerId) {
    for (var j = 0; j < 3; j += 1) {
      aRow.cells[j].removeAttribute('class');
    }
    aRow.classList.add('fshGrey');
    aRow.classList.add('fshXXSmall');
  }

  var hasInvited = aRow.cells[2].textContent
    .search('has invited the player') !== -1;

  if (aRow.cells[2].textContent.charAt(0) === '\'' || hasInvited) {
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
}

export function addGuildLogWidgets() { // Legacy
  if (!system.getValue('hideNonPlayerGuildLogMessages')) {return;}
  var nodeList = layout.pCC.getElementsByTagName('TD');
  var messageNameCell = Array.prototype.reduce.call(nodeList,
    function(prev, curr) {
      return curr.textContent === 'Message' ? curr : prev;
    }, null
  );
  if (!messageNameCell) {return;}
  var logTable = messageNameCell.parentNode.parentNode.parentNode;
  messageNameCell.innerHTML += '&nbsp;&nbsp;<span class="' +
    'fshWhite">(Guild Log messages not involving ' +
    'self are dimmed!)</span>';

  playerId = layout.playerId();

  for (var i = 1; i < logTable.rows.length; i += 2) {
    var aRow = logTable.rows[i];
    processGuildWidgetRow(aRow);
  }
}

export function guildChat() { // Native
  addChatTextArea();
  addLogColoring('Chat', 0);
}

export function guildLog() { // Native
  addLogColoring('GuildLog', 1);
  addGuildLogWidgets();
}

export function outbox() { // Native
  addLogColoring('OutBox', 1);
}

export function playerLog() { // Native
  addLogColoring('PlayerLog', 1);
  addLogWidgets();
}
