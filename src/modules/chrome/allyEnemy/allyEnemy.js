import add from '../../support/task';
import addContacts from './addContacts';
import calf from '../../support/calf';
import classHandler from '../../common/classHandler';
import {createDiv} from '../../common/cElement';
import fallback from '../../system/fallback';
import getArrayByClassName from '../../common/getArrayByClassName';
import {getElementById} from '../../common/getElement';
import getText from '../../common/getText';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import myStats from '../../ajax/myStats';
import on from '../../common/on';
import openQuickBuffByName from '../../common/openQuickBuffByName';
import {pCR} from '../../support/layout';
import partial from '../../common/partial';
import {
  enemyBuffCheckOff,
  enemyBuffCheckOn,
  enemyQuickbuff,
  enemySelectedBuff,
  enemySendMessage,
} from './constants';

var noAlliesTests = [
  function(allies, enemies) {return allies.length + enemies.length;},
  function(allies, enemies) {
    if (!calf.enableAllyOnlineList) {return enemies.length;}
  },
  function(allies) {
    if (!calf.enableEnemyOnlineList) {return allies.length;}
  }
];

function condition(allies, enemies, e) {return e(allies, enemies) === 0;}

function noAllies(allies, enemies) {
  return noAlliesTests.every(partial(condition, allies, enemies));
}

function hazAllies(allies, enemies) {
  var output = '';
  if (calf.enableAllyOnlineList) {
    output += addContacts(allies, true);
  }
  if (calf.enableEnemyOnlineList) {
    output += addContacts(enemies, false);
  }
  var fshContactList = getElementById('fshContactList');
  fshContactList.innerHTML = '';
  insertHtmlBeforeEnd(fshContactList, output);
}

function injectAllyEnemyList(data) {
  var allies = fallback(data._allies, []);
  var enemies = fallback(data._enemies, []);
  if (noAllies(allies, enemies)) {return;}
  hazAllies(allies, enemies);
}

function resetList() {
  myStats(true).then(injectAllyEnemyList);
}

function toggleBuffSelected(self) {
  self.classList.toggle(enemyBuffCheckOn);
  self.classList.toggle(enemyBuffCheckOff);
}

function msgPlayer(self) {
  window.openQuickMsgDialog(getText(self.parentNode.previousElementSibling
    .lastElementChild));
}

function buffPlayer(self) {
  openQuickBuffByName(getText(self.parentNode
    .previousElementSibling.lastElementChild));
}

function selectedBuff() {
  var buffBalls = getArrayByClassName(enemyBuffCheckOn,
    getElementById('fshContactList'));
  var sendstring = buffBalls.map(
    function(el) {return getText(el.nextElementSibling);});
  openQuickBuffByName(sendstring.join());
}

var classEvt = [
  [enemyBuffCheckOn, toggleBuffSelected],
  [enemyBuffCheckOff, toggleBuffSelected],
  [enemySendMessage, msgPlayer],
  [enemyQuickbuff, buffPlayer],
  [enemySelectedBuff, selectedBuff]
];

function eventHandler(evt) {
  var self = evt.target;
  if (self.id === 'fshResetEnemy') {
    resetList();
    return;
  }
  classHandler(classEvt)(evt);
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
    wrapper += '<ul class="' + enemySelectedBuff + '">Quick Buff Selected</ul>';
  }
  wrapper += '</div></div>';
  insertHtmlBeforeEnd(fshAllyEnemy, wrapper);
  insertElementAfterBegin(pCR, fshAllyEnemy);
  on(fshAllyEnemy, 'click', eventHandler);
  injectAllyEnemyList(data);
}

function nextTick(data) {
  if (data) {
    add(3, makeDiv, [data]);
  }
}

export default function prepareAllyEnemyList() {
  if (jQueryNotPresent()) {return;}
  myStats(false).then(nextTick);
}
