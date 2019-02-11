import calf from '../../support/calf';
import formatLastActivity from '../../system/formatLastActivity';
import {nowSecs} from '../../support/now';
import partial from '../../common/partial';
import {
  enemyBuffCheckOn,
  enemyQuickbuff,
  enemySendMessage
} from './constants';
import {
  playerIdUrl,
  secureUrl,
  tradeUrl
} from '../../support/constants';

export var contactClass = [
  [
    function(n) {return n < 120;},
    'fshDodgerBlue',
    'fshRed'
  ],
  [
    function(n) {return n < 300;},
    'fshDodgerBlue',
    'fshRed'
  ],
  [
    function() {return true;},
    'fshPowderBlue',
    'fshPink'
  ]
];

function allyOrEnemy(type, test) {
  if (type) {return test[1];}
  return test[2];
}

function band(last_login, ary) {
  return ary[0](nowSecs - last_login);
}

function contactColor(last_login, type) {
  var test = contactClass.find(partial(band, last_login));
  if (test) {return allyOrEnemy(type, test);}
  return 'fshWhite';
}

function playerName(val, type) {
  return '<a class="player-name tip-static ' +
    contactColor(val.last_login, type) + '" data-tipped="<b>' + val.username +
    '</b><br><table><tbody><tr><td>Level:</td><td>' + val.level +
    '</td></tr><tr><td>Last Activity:</td><td>' +
    formatLastActivity(val.last_login) + '</td></tr></tbody></table>" href="' +
    playerIdUrl + val.id + '">' + val.username + '</a>';
}

function doBuffCheck() {
  if (!calf.hideBuffSelected) {
    return '<span class="' + enemyBuffCheckOn + '"></span>';
  }
  return '';
}

function doMsgButton() {
  if (!calf.hideGuildInfoMessage) {
    return '<span class="' + enemySendMessage + ' guild-icon left ' +
      'guild-minibox-action tip-static" data-tipped="Send Message"></span>';
  }
  return '';
}

function doBuffButton() {
  if (!calf.hideGuildInfoBuff) {
    return '<span class="' + enemyQuickbuff + ' guild-icon left ' +
      'guild-minibox-action tip-static" data-tipped="Quick Buff"></span>';
  }
  return '';
}

function doSecureButton(val) {
  if (!calf.hideGuildInfoSecureTrade) {
    return '<a class="enemy-secure-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="' + secureUrl +
      val.username + '" data-tipped="Secure Trade"></a>';
  }
  return '';
}

function doTradeButton(val) {
  if (!calf.hideGuildInfoTrade) {
    return '<a class="enemy-trade guild-icon left ' +
      'guild-minibox-action tip-static" href="' + tradeUrl +
      val.username + '" data-tipped="Send Gold/Items/FSP"></a>';
  }
  return '';
}

function recent(val) {
  return nowSecs - val.last_login < 1800;
}

function addContact(type, val) {
  return '<li class="player"><div class="player-row">' +
    doBuffCheck() +
    playerName(val, type) +
    '</div><div class="guild-minibox-actions">' +
    doMsgButton() +
    doBuffButton() +
    doSecureButton(val) +
    doTradeButton(val) +
    '</div></li>';
}

export default function addContacts(contactList, type) {
  return contactList.filter(recent).map(partial(addContact, type)).join('');
}
