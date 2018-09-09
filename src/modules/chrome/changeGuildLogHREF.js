import getValue from '../system/getValue';
import {newGuildLogLoc, newGuildLogUrl} from '../support/constants';

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
  Array.from(guildLogNodes).forEach(function(el) {
    el.href = newGuildLogUrl;
  });
  hideGuildLogMsg(guildLogNodes[guildLogNodes.length - 1]);
}

export default function changeGuildLogHREF() {
  if (!getValue('useNewGuildLog')) {return;}
  var guildLogNodes = document.querySelectorAll(
    '#pCL a[href="index.php?cmd=guild&subcmd=log"]');
  if (guildLogNodes.length > 0) {gotGuildLogNodes(guildLogNodes);}
}
