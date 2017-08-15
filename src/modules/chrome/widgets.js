import calf from '../support/calf';

function hideElement(el) {
  el.classList.add('fshHide');
}

function hideNodeList(nodeList) {
  Array.prototype.forEach.call(nodeList, hideElement);
}

function hideQuerySelectorAll(parent, selector) { // Native - probably wrong
  hideNodeList(parent.querySelectorAll(selector));
}

function contactColour(el, obj) {
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

function guildColour(el) {
  contactColour(el, {
    l1: 'fshGreen',
    l2: 'fshWhite',
    l3: 'fshGrey'
  });
}

function alliesColour(el) {
  contactColour(el, {
    l1: 'fshDodgerBlue',
    l2: 'fshLightSkyBlue',
    l3: 'fshPowderBlue'
  });
}

var hideBtn = [
  {
    condition: function() {return calf.hideGuildInfoTrade;},
    guildSelector: '#guild-minibox-action-trade',
    allySelector: '#online-allies-action-trade'
  },
  {
    condition: function() {return calf.hideGuildInfoSecureTrade;},
    guildSelector: '#guild-minibox-action-secure-trade',
    allySelector: '#online-allies-action-secure-trade'
  },
  {
    condition: function() {return calf.hideGuildInfoBuff;},
    guildSelector: '#guild-minibox-action-quickbuff',
    allySelector: '#online-allies-action-quickbuff'
  },
  {
    condition: function() {return calf.hideGuildInfoMessage;},
    guildSelector: '#guild-minibox-action-send-message',
    allySelector: '#online-allies-action-send-message'
  }
];

function doHideBtn(context, selector) {
  hideBtn.forEach(function(el) {
    if (el.condition()) {
      hideQuerySelectorAll(context, el[selector]);
    }
  });
}

export function addGuildInfoWidgets() {
  var guildMembrList = document.getElementById('minibox-guild-members-list');
  if (!guildMembrList) {return;} // list exists
  // hide guild info links
  doHideBtn(guildMembrList, 'guildSelector');
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

export function addOnlineAlliesWidgets() {
  var onlineAlliesList = document.getElementById('minibox-allies-list');
  if (!onlineAlliesList) {return;}
  doHideBtn(onlineAlliesList, 'allySelector');
  if (calf.hideBuffSelected) {
    hideNodeList(
      onlineAlliesList.getElementsByClassName('ally-buff-check-on'));
    document.getElementById('ally-quick-buff').classList.add('fshHide');
  }
  // add coloring for offline time
  Array.prototype.forEach.call(
    onlineAlliesList.getElementsByClassName('player-name'), alliesColour);
}
