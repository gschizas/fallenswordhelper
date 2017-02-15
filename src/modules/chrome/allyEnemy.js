import calf from '../support/calf';
import * as task from '../support/task';
import * as system from '../support/system';
import * as ajax from '../support/ajax';

var buffCheck = '<span class="enemy-buff-check-on"></span>';
var msgButton = '<span class="enemy-send-message guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
var buffButton = '<span class="enemy-quickbuff guild-icon left ' +
  'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';

function contactColor(last_login, type) { // Native
  var out = 'fshWhite';
  var now = Math.floor(Date.now() / 1000);
  if (now - last_login < 120) { // 2 mins
    out = type ? 'fshDodgerBlue' : 'fshRed';
  } else if (now - last_login < 300) { // 5 mins
    out = type ? 'fshLightSkyBlue' : 'fshPaleVioletRed';
  } else {out = type ? 'fshPowderBlue' : 'fshPink';}
  return out;
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

function secureButton(val) { // Native
  return '<a class="enemy-secure-trade guild-icon left ' +
    'guild-minibox-action tip-static" href="index.php?cmd=trade' +
    '&subcmd=createsecure&target_username=' + val.username +
    '" data-tipped="Secure Trade"></a>';
}

function tradeButton(val) { // Native
  return '<a class="enemy-trade guild-icon left ' +
    'guild-minibox-action tip-static" href="index.php?cmd=trade' +
    '&target_player=' + val.username +
    '" data-tipped="Send Gold/Items/FSP"></a>';
}

function addContact(contactList, type) { // Native
  var now = Math.floor(Date.now() / 1000);
  var output = '';
  contactList.forEach(function(val) {
    if (now - val.last_login > 1800) {return;} // 30 mins
    output += '<li class="player"><div class="player-row">';
    if (!calf.hideBuffSelected) {
      output += buffCheck;
    }
    output += playerName(val, type);
    output += '</div><div class="guild-minibox-actions">';
    if (!calf.hideGuildInfoMessage) {
      output += msgButton;
    }
    if (!calf.hideGuildInfoBuff) {
      output += buffButton;
    }
    if (!calf.hideGuildInfoSecureTrade) {
      output += secureButton(val);
    }
    if (!calf.hideGuildInfoTrade) {
      output += tradeButton(val);
    }
    output += '</div></li>';
  });
  return output;
}

function injectAllyEnemyList(data) { // Native
  var allies = data._allies || [];
  var enemies = data._enemies || [];
  if (allies.length + enemies.length === 0 ||
    !calf.enableAllyOnlineList && enemies.length === 0 ||
    !calf.enableEnemyOnlineList && allies.length === 0) {
    return;
  }
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

function resetAllyEnemyList() { // jQuery.min
  ajax.myStats(true)
    .done(injectAllyEnemyList);
}

function quickBuffToggle(evt) { // Native
  evt.target.classList.toggle('enemy-buff-check-on');
  evt.target.classList.toggle('enemy-buff-check-off');
}

function sendMsg(evt) { // Native
  window.openQuickMsgDialog(evt.target.parentNode.previousElementSibling
    .lastElementChild.textContent);
}

function enemyBuff(evt) { // Native
  window.openWindow('index.php?cmd=quickbuff&t=' + evt.target.parentNode
    .previousElementSibling.lastElementChild.textContent,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function selectedBuff() { // Native
  var buffBalls = document.getElementById('fshContactList')
    .getElementsByClassName('enemy-buff-check-on');
  var sendstring = Array.prototype.reduce.call(buffBalls,
    function(prev, curr) {
      prev.push(curr.nextElementSibling.textContent);
      return prev;
    }, []);
  window.openWindow('index.php?cmd=quickbuff&t=' + sendstring.join(),
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

function eventHandler(evt) { // Native
  if (evt.target.id === 'fshResetEnemy') {
    resetAllyEnemyList(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-buff-check-on') ||
      evt.target.classList.contains('enemy-buff-check-off')) {
    quickBuffToggle(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-send-message')) {
    sendMsg(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-quickbuff')) {
    enemyBuff(evt);
    return;
  }
  if (evt.target.classList.contains('enemy-quick-buff')) {
    selectedBuff();
  }
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
