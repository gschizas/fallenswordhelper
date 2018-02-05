import getValue from '../system/getValue';
import {newGuildLogLoc, newGuildLogUrl} from '../support/dataObj';

function testForGuildLogMsg(guildLogNode) {
  return location.search !== newGuildLogLoc ||
    guildLogNode.parentNode.id !== 'notification-guild-log';
}

function hideGuildLogMsg(guildLogNode) {
  // hide the lhs box
  if (testForGuildLogMsg(guildLogNode)) {return;}
  var messageBox = guildLogNode.parentNode;
  if (messageBox) {
    messageBox.classList.add('fshHide');
  }
}

function gotGuildLogNodes(guildLogNodes) {
  var guildLogNode;
  for (var i = 0; i < guildLogNodes.length; i += 1) {
    guildLogNode = guildLogNodes[i];
    guildLogNode.href = newGuildLogUrl;
  }
  hideGuildLogMsg(guildLogNode);
}

export default function changeGuildLogHREF() {
  if (!getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  if (guildLogNodes) {gotGuildLogNodes(guildLogNodes);}
}
