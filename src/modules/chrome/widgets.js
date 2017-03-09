import calf from '../support/calf';
import * as common from '../support/common';

function hideElement(el) { // Native
  el.classList.add('fshHide');
}

function hideNodeList(nodeList) { // Native
  Array.prototype.forEach.call(nodeList, hideElement);
}

function hideQuerySelectorAll(parent, selector) { // Native - probably wrong
  hideNodeList(parent.querySelectorAll(selector));
}

function contactColour(el, obj) { // Native
  var onMouseOver = el.getAttribute('data-tipped');
  var lastActivityMinutes =
    /Last Activity:<\/td><td>(\d+) mins/.exec(onMouseOver)[1];
  if (lastActivityMinutes < 2) {
    el.classList.add(obj.l1);
  } else if (lastActivityMinutes < 5) {
    el.classList.add(obj.l2);
  } else {
    el.classList.add(obj.l3);
  }
}

function guildColour(el) { // Native
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function alliesColour(el) { // Native
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue'
  });
}

export function addGuildInfoWidgets() { // Native
  var guildMembrList = document.getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(guildMembrList, '#guild-minibox-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(guildMembrList, '#guild-minibox-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(guildMembrList, '#guild-minibox-action-send-message');
  }
  if (calf.hideBuffSelected) {
    hideNodeList(
      guildMembrList.getElementsByClassName('guild-buff-check-on'));
    document.getElementById('guild-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    guildMembrList.getElementsByClassName('player-name'), guildColour);
  Array.prototype.forEach.call(
    document.querySelectorAll('#pCR h4'),
    function(el) {
      if (el.textContent !== 'Chat') {return;}
      el.innerHTML = '<a href="index.php?cmd=guild&subcmd=chat">' +
        el.textContent + '</a>';
    }
  );
}

export function addOnlineAlliesWidgets() { // Native
  var onlineAlliesList = document.getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  var hideQSA = hideQuerySelectorAll;
  if (calf.hideGuildInfoTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-trade');
  }
  if (calf.hideGuildInfoSecureTrade) {
    hideQSA(onlineAlliesList, '#online-allies-action-secure-trade');
  }
  if (calf.hideGuildInfoBuff) {
    hideQSA(onlineAlliesList, '#online-allies-action-quickbuff');
  }
  if (calf.hideGuildInfoMessage) {
    hideQSA(onlineAlliesList, '#online-allies-action-send-message');
  }
  if (calf.hideBuffSelected) {
    hideNodeList(
      onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
    document.getElementById('ally-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
}

export function fixOnlineGuildBuffLinks() { // Native
  common.updateHCSQuickBuffLinks(
    '#minibox-guild-members-list #guild-minibox-action-quickbuff');
  common.updateHCSQuickBuffLinks(
    '#minibox-allies-list #online-allies-action-quickbuff');
}
