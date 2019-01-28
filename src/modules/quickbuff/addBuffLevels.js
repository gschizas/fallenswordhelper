import addStatsQuickBuff from './addStatsQuickBuff';
import {createSpan} from '../common/cElement';
import csvSplit from '../common/csvSplit';
import getProfile from '../ajax/getProfile';
import getText from '../common/getText';
import insertElementAfter from '../common/insertElementAfter';
import parseBuffLevel from './parseBuffLevel';
import partial from '../common/partial';
import querySelectorArray from '../common/querySelectorArray';

function newPlayerSpan(el, playerSpan) {
  if (!playerSpan) {
    var ret = createSpan({className: 'fshPlayer'});
    insertElementAfter(ret, el.nextElementSibling);
    return ret;
  }
  return playerSpan;
}

function getBuffColor(myLvl, playerBuffLevel) {
  if (myLvl > playerBuffLevel) {return 'fshRed';}
  return 'fshGreen';
}

function buffRunning(el, playerBuffLevel, playerSpan) {
  if (!playerBuffLevel) {
    playerSpan.innerHTML = '';
    return;
  }
  var lvlSpan = el.nextElementSibling.children[0].children[0];
  var myLvl = parseBuffLevel(lvlSpan);
  var fshPlayerSpan = newPlayerSpan(el, playerSpan);
  var buffColor = getBuffColor(myLvl, playerBuffLevel);
  fshPlayerSpan.innerHTML = ' <span class="' + buffColor +
    '">[' + playerBuffLevel + ']</span>';
}

function thisBuff(myBuffName, arr) {
  return arr[0] === myBuffName;
}

function thisBuffLevel(playerData, el) {
  var myBuffName = el.getAttribute('data-name');
  var buffArr = playerData.find(partial(thisBuff, myBuffName));
  if (buffArr) {return buffArr[1];}
}

function hazBuff(playerData, el) {
  var playerBuffLevel = thisBuffLevel(playerData, el);
  var playerSpan = el.nextElementSibling.nextElementSibling;
  if (playerBuffLevel || playerSpan) {
    buffRunning(el, playerBuffLevel, playerSpan);
  }
}

function shred(str) {
  return str.split(/ \[|]/);
}

function makeBuffArray(player) {
  return csvSplit(getText(player.parentNode.lastElementChild)).map(shred);
}

export default function addBuffLevels(evt) {
  var player = evt.target;
  if (player.tagName !== 'H1') {return;}
  getProfile(getText(player)).done(addStatsQuickBuff);
  var playerData = makeBuffArray(player);
  querySelectorArray('#buff-outer input[name]')
    .forEach(partial(hazBuff, playerData));
}
