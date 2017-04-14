import calf from '../support/calf';
import * as ajax from '../support/ajax';
import * as layout from '../support/layout';
import * as system from '../support/system';
import * as task from '../support/task';

var buffCheck = '<span class="enemy-buff-check-on"></span>';
var msgButton = '<span class="enemy-send-message guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
var buffButton = '<span class="enemy-quickbuff guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';

var contactClass = [
  {
    condition: function(n) {return n < 120;},
    ally: 'fshDodgerBlue',
    enemy: 'fshRed'
  },
  {
    condition: function(n) {return n < 300;},
    ally: 'fshDodgerBlue',
    enemy: 'fshRed'
  },
  {
    condition: function() {return true;},
    ally: 'fshPowderBlue',
    enemy: 'fshPink'
  }
];

function contactColor(last_login, type) { // Native
  var now = Math.floor(Date.now() / 1000);
  for (var i = 0; i < contactClass.length; i += 1) {
    var test = contactClass[i];
    if (test.condition(now - last_login)) {
      if (type) {return test.ally;}
      return test.enemy;
    }
  }
  return 'fshWhite';
}

function playerName(val, type) { // Native
  return '<a class="player-name tip-static ' +
    contactColor(val.last_login, type) +
    '" data-tipped="<b>' + val.username + '</b><br><table><tbody><tr>' +
    '<td>Level:</td><td>' + val.level + '</td></tr><tr><td>Last ' +
    'Activity:</td><td>' + system.formatLastActivity(val.last_login) +
    '</td></tr></tbody></table>" href="index.php?cmd=profile&player_id=' +
    val.id + '">' + val.username + '</a>';
}

function doBuffCheck() { // Native
  if (!calf.hideBuffSelected) {
    return buffCheck;
  }
  return '';
}

function doMsgButton() { // Native
  if (!calf.hideGuildInfoMessage) {
    return msgButton;
  }
  return '';
}

function doBuffButton() { // Native
  if (!calf.hideGuildInfoBuff) {
    return buffButton;
  }
  return '';
}

function doSecureButton(val) { // Native
  if (!calf.hideGuildInfoSecureTrade) {
    return '<a class="enemy-secure-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="index.php?cmd=trade' +
      '&subcmd=createsecure&target_username=' + val.username +
      '" data-tipped="Secure Trade"></a>';
  }
  return '';
}

function doTradeButton(val) { // Native
  if (!calf.hideGuildInfoTrade) {
    return '<a class="enemy-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="index.php?cmd=trade' +
      '&target_player=' + val.username +
      '" data-tipped="Send Gold/Items/FSP"></a>';
  }
  return '';
}

function addContact(contactList, type) { // Native
  var now = Math.floor(Date.now() / 1000);
  var output = '';
  contactList.forEach(function(val) {
    if (now - val.last_login > 1800) {return;} // 30 mins
    output += '<li class="player"><div class="player-row">';
    output += doBuffCheck();
    output += playerName(val, type);
    output += '</div><div class="guild-minibox-actions">';
    output += doMsgButton();
    output += doBuffButton();
    output += doSecureButton(val);
    output += doTradeButton(val);
    output += '</div></li>';
  });
  return output;
}

function newAry(maybe) {
  return maybe || [];
}

function noAllies(allies, enemies) {
  return allies.length + enemies.length === 0 ||
    !calf.enableAllyOnlineList && enemies.length === 0 ||
    !calf.enableEnemyOnlineList && allies.length === 0;
}

function injectAllyEnemyList(data) { // Native
  var allies = newAry(data._allies);
  var enemies = newAry(data._enemies);
  if (noAllies(allies, enemies)) {return;}
  var output = '';
  if (calf.enableAllyOnlineList) {
    output += addContact(allies, true);
  }
  if (calf.enableEnemyOnlineList) {
    output += addContact(enemies, false);
  }
  var fshContactList = document.getElementById('fshContactList');
  fshContactList.innerHTML = '';
  fshContactList.insertAdjacentHTML('beforeend', output);
}

function resetList() { // jQuery
  ajax.myStats(true).done(injectAllyEnemyList);
}

function toggleBuffSelected(self) { // Native
  self.classList.toggle('enemy-buff-check-on');
  self.classList.toggle('enemy-buff-check-off');
}

function msgPlayer(self) { // Native
  window.openQuickMsgDialog(self.parentNode.previousElementSibling
    .lastElementChild.textContent);
}

function buffPlayer(self) { // Native
  layout.openQuickBuffByName(self.parentNode
    .previousElementSibling.lastElementChild.textContent);
}

function selectedBuff() { // Native
  var buffBalls = document.getElementById('fshContactList')
    .getElementsByClassName('enemy-buff-check-on');
  var sendstring = Array.prototype.reduce.call(buffBalls,
    function(prev, curr) {
      prev.push(curr.nextElementSibling.textContent);
      return prev;
    }, []);
  layout.openQuickBuffByName(sendstring.join());
}

var classEvt = [
  {className: 'enemy-buff-check-on', handler: toggleBuffSelected},
  {className: 'enemy-buff-check-off', handler: toggleBuffSelected},
  {className: 'enemy-send-message', handler: msgPlayer},
  {className: 'enemy-quickbuff', handler: buffPlayer},
  {className: 'enemy-quick-buff', handler: selectedBuff}
];

function eventHandler(evt) { // Native
  var self = evt.target;
  if (self.id === 'fshResetEnemy') {
    resetList();
    return;
  }
  classEvt.some(function(test) {
    if (self.classList.contains(test.className)) {
      test.handler(self);
      return true;
    }
    return false;
  });
}

function makeDiv(data) { // Native
  var fshAllyEnemy = document.createElement('DIV');
  fshAllyEnemy.id = 'fshAllyEnemy';
  fshAllyEnemy.className = 'minibox';
  var wrapper = '<h3>Allies/Enemies</h3><div class="minibox-content">' +
    '<h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4>' +
    '<div id="minibox-enemy"><ul id="fshContactList"></ul>';
  if (!calf.hideBuffSelected) {
    wrapper += '<ul class="enemy-quick-buff">Quick Buff Selected</ul>';
  }
  wrapper += '</div></div>';
  fshAllyEnemy.insertAdjacentHTML('beforeend', wrapper);
  document.getElementById('pCR')
    .insertAdjacentElement('afterbegin', fshAllyEnemy);
  fshAllyEnemy.addEventListener('click', eventHandler);
  injectAllyEnemyList(data);
}

export function prepareAllyEnemyList() { // jQuery.min
  ajax.myStats(false)
    .done(function(data) {
      task.add(3, makeDiv, [data]);
    });
}
