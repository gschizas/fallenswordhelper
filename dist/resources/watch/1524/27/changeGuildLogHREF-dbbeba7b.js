import { E as querySelectorArray, bk as guildLogUrl, c3 as newGuildLogLoc, c4 as newGuildLogUrl } from './calfSystem-975d976a.js';
import { h as hideElement } from './hideElement-b0b3e820.js';

function testForGuildLogMsg(guildLogNode) {
  return window.location.search !== newGuildLogLoc
    || guildLogNode.parentNode.id !== 'notification-guild-log';
}

function hideGuildLogMsg(guildLogNode) {
  // hide the lhs box
  if (testForGuildLogMsg(guildLogNode)) { return; }
  const messageBox = guildLogNode.parentNode;
  if (messageBox) {
    hideElement(messageBox);
  }
}

// eslint-disable-next-line no-param-reassign
function updateHref(el) { el.href = newGuildLogUrl; }

function gotGuildLogNodes(guildLogNodes) {
  guildLogNodes.forEach(updateHref);
  hideGuildLogMsg(guildLogNodes[guildLogNodes.length - 1]);
}

function changeGuildLogHREF() {
  const guildLogNodes = querySelectorArray(
    `#pCL a[href="${guildLogUrl}"]`,
  );
  if (guildLogNodes.length > 0) { gotGuildLogNodes(guildLogNodes); }
}

export default changeGuildLogHREF;
//# sourceMappingURL=changeGuildLogHREF-dbbeba7b.js.map
