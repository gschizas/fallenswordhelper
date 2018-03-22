import calf from '../support/calf';
import quickBuffHref from '../common/quickBuffHref';

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

function doBuffLink(_buffsSent, targetPlayerID) { // Legacy
  var quickBuff = '';
  var buffsSent = _buffsSent[0].replace('`~', '').replace('~`', '')
    .split(/\s*,\s*/);
  buffsSent.reduce(function(prev, el) {
    var ret = prev;
    var nick = el.toLowerCase();
    if (calf.nickList[nick]) {
      ret += calf.nickList[nick].toString() + ';';
    }
    return ret;
  }, '');
  return ' | <a ' + quickBuffHref(targetPlayerID, quickBuff) +
      '>Buff</a></span>';
}

function getAttackPart(playerName) { // Legacy
  if (calf.addAttackLinkToLog) {
    return ' | <a href="index.php?cmd=attackplayer&target_username=' +
      playerName + '">Attack</a>';
  }
  return '';
}

function getThirdPart(messageHTML) { // Legacy
  var thirdPart = messageHTML.substring(messageHTML.indexOf('>Reply</a>') + 10,
    messageHTML.indexOf('>Buff</a>') + 9);
  var targetPlayerRE = /quickBuff\((\d+)\)/.exec(thirdPart);
  if (targetPlayerRE) {
    var targetPlayerID = targetPlayerRE[1];
    var buffsSent = messageHTML.match(/`~.*?~`/);
    if (buffsSent) {
      return doBuffLink(buffsSent, targetPlayerID);
    }
    return ' | <a ' + quickBuffHref(targetPlayerID) + '>Buff</a></span>';
  }
  return '';
}

function isChat(aRow, isGuildMate, playerName) { // Legacy
  reportIgnore(aRow, isGuildMate, playerName);
  var messageHTML = aRow.cells[2].innerHTML;
  var firstPart = messageHTML.substring(0, messageHTML.indexOf('<small>') + 7);
  var thirdPart = getThirdPart(messageHTML);
  var fourthPart = messageHTML.substring(messageHTML
    .indexOf('>Trade</a>') + 10, messageHTML.indexOf('</small>'));
  var lastPart = messageHTML.substring(messageHTML.indexOf('</small>'),
    messageHTML.length);
  var extraPart = ' | <a href="index.php?cmd=trade&target_player=' +
    playerName + '">Trade</a> | <a title="Secure Trade" ' +
    'href="index.php?cmd=trade&subcmd=createsecure&target_username=' +
    playerName + '">ST</a>';
  var attackPart = getAttackPart(playerName);
  var replyTo = '';
  if (calf.enableChatParsing) {
    replyTo = removeHTML(firstPart.replace(/&nbsp;/g, ' ')).substr(0, 140);
  }
  var msgReplyTo = '[ <span style="cursor:pointer;text-' +
    'decoration:underline"class="a-reply" target_player="' + playerName +
    '" replyTo="' + replyTo + '...">Reply</span>';
  aRow.cells[2].innerHTML = firstPart + '<nobr>' + msgReplyTo +
    extraPart + thirdPart + attackPart + fourthPart +
    '</nobr>' + lastPart;
}

export default function doChat(messageType, aRow, isGuildMate, playerName) { // Legacy
  if (messageType === 'Chat') {isChat(aRow, isGuildMate, playerName);}
}
