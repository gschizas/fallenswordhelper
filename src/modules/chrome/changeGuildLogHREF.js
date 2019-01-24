import getValue from '../system/getValue';
import hideElement from '../common/hideElement';
import querySelectorArray from '../common/querySelectorArray';
import {
  guildLogUrl,
  newGuildLogLoc,
  newGuildLogUrl
} from '../support/constants';

function testForGuildLogMsg(guildLogNode) {
  return location.search !== newGuildLogLoc ||
    guildLogNode.parentNode.id !== 'notification-guild-log';
}

function hideGuildLogMsg(guildLogNode) {
  // hide the lhs box
  if (testForGuildLogMsg(guildLogNode)) {return;}
  var messageBox = guildLogNode.parentNode;
  if (messageBox) {
    hideElement(messageBox);
  }
}

function gotGuildLogNodes(guildLogNodes) {
  guildLogNodes.forEach(function(el) {
    el.href = newGuildLogUrl;
  });
  hideGuildLogMsg(guildLogNodes[guildLogNodes.length - 1]);
}

export default function changeGuildLogHREF() {
  if (!getValue('useNewGuildLog')) {return;}
  var guildLogNodes = querySelectorArray(
    '#pCL a[href="' + guildLogUrl + '"]');
  if (guildLogNodes.length > 0) {gotGuildLogNodes(guildLogNodes);}
}
