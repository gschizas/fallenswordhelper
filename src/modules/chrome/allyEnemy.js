import add from '../support/task';
import calf from '../support/calf';
import {createDiv} from '../common/cElement';
import fallback from '../system/fallback';
import {formatLastActivity} from '../system/system';
import {getElementById} from '../common/getElement';
import myStats from '../ajax/myStats';
import {nowSecs} from '../support/dataObj';
import {openQuickBuffByName, pCR} from '../support/layout';

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

function allyOrEnemy(type, test) {
  if (type) {return test.ally;}
  return test.enemy;
}

function contactColor(last_login, type) {
  for (var i = 0; i < contactClass.length; i += 1) {
    var test = contactClass[i];
    if (test.condition(nowSecs - last_login)) {
      return allyOrEnemy(type, test);
    }
  }
  return 'fshWhite';
}

function playerName(val, type) {
  return '<a class="player-name tip-static ' +
    contactColor(val.last_login, type) +
    '" data-tipped="<b>' + val.username + '</b><br><table><tbody><tr>' +
    '<td>Level:</td><td>' + val.level + '</td></tr><tr><td>Last ' +
    'Activity:</td><td>' + formatLastActivity(val.last_login) +
    '</td></tr></tbody></table>" href="index.php?cmd=profile&player_id=' +
    val.id + '">' + val.username + '</a>';
}

function doBuffCheck() {
  if (!calf.hideBuffSelected) {
    return buffCheck;
  }
  return '';
}

function doMsgButton() {
  if (!calf.hideGuildInfoMessage) {
    return msgButton;
  }
  return '';
}

function doBuffButton() {
  if (!calf.hideGuildInfoBuff) {
    return buffButton;
  }
  return '';
}

function doSecureButton(val) {
  if (!calf.hideGuildInfoSecureTrade) {
    return '<a class="enemy-secure-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="index.php?cmd=trade' +
      '&subcmd=createsecure&target_username=' + val.username +
      '" data-tipped="Secure Trade"></a>';
  }
  return '';
}

function doTradeButton(val) {
  if (!calf.hideGuildInfoTrade) {
    return '<a class="enemy-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="index.php?cmd=trade' +
      '&target_player=' + val.username +
      '" data-tipped="Send Gold/Items/FSP"></a>';
  }
  return '';
}

function addContact(contactList, type) {
  var output = '';
  contactList.forEach(function(val) {
    if (nowSecs - val.last_login > 1800) {return;} // 30 mins
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

var noAlliesTests = [
  function(allies, enemies) {return allies.length + enemies.length;},
  function(allies, enemies) {
    if (!calf.enableAllyOnlineList) {return enemies.length;}
  },
  function(allies) {
    if (!calf.enableEnemyOnlineList) {return allies.length;}
  }
];

function noAllies(allies, enemies) {
  return noAlliesTests.every(function(e) {return e(allies, enemies) === 0;});
}

function hazAllies(allies, enemies) {
  var output = '';
  if (calf.enableAllyOnlineList) {
    output += addContact(allies, true);
  }
  if (calf.enableEnemyOnlineList) {
    output += addContact(enemies, false);
  }
  var fshContactList = getElementById('fshContactList');
  fshContactList.innerHTML = '';
  fshContactList.insertAdjacentHTML('beforeend', output);
}

function injectAllyEnemyList(data) {
  var allies = fallback(data._allies, []);
  var enemies = fallback(data._enemies, []);
  if (noAllies(allies, enemies)) {return;}
  hazAllies(allies, enemies);
}

function resetList() { // jQuery
  myStats(true).done(injectAllyEnemyList);
}

function toggleBuffSelected(self) {
  self.classList.toggle('enemy-buff-check-on');
  self.classList.toggle('enemy-buff-check-off');
}

function msgPlayer(self) {
  window.openQuickMsgDialog(self.parentNode.previousElementSibling
    .lastElementChild.textContent);
}

function buffPlayer(self) {
  openQuickBuffByName(self.parentNode
    .previousElementSibling.lastElementChild.textContent);
}

function selectedBuff() {
  var buffBalls = getElementById('fshContactList')
    .getElementsByClassName('enemy-buff-check-on');
  var sendstring = Array.prototype.reduce.call(buffBalls,
    function(prev, curr) {
      prev.push(curr.nextElementSibling.textContent);
      return prev;
    }, []);
  openQuickBuffByName(sendstring.join());
}

var classEvt = [
  {className: 'enemy-buff-check-on', handler: toggleBuffSelected},
  {className: 'enemy-buff-check-off', handler: toggleBuffSelected},
  {className: 'enemy-send-message', handler: msgPlayer},
  {className: 'enemy-quickbuff', handler: buffPlayer},
  {className: 'enemy-quick-buff', handler: selectedBuff}
];

function eventHandler(evt) {
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

function makeDiv(data) {
  var fshAllyEnemy = createDiv({
    id: 'fshAllyEnemy',
    className: 'minibox'
  });
  var wrapper = '<h3>Allies/Enemies</h3><div class="minibox-content">' +
    '<h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4>' +
    '<div id="minibox-enemy"><ul id="fshContactList"></ul>';
  if (!calf.hideBuffSelected) {
    wrapper += '<ul class="enemy-quick-buff">Quick Buff Selected</ul>';
  }
  wrapper += '</div></div>';
  fshAllyEnemy.insertAdjacentHTML('beforeend', wrapper);
  pCR.insertAdjacentElement('afterbegin', fshAllyEnemy);
  fshAllyEnemy.addEventListener('click', eventHandler);
  injectAllyEnemyList(data);
}

export default function prepareAllyEnemyList() { // jQuery.min
  myStats(false)
    .done(function(data) {
      add(3, makeDiv, [data]);
    });
}
