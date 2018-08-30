import {createSpan} from '../common/cElement';
import formatLastActivity from '../system/formatLastActivity';
import getProfile from '../ajax/getProfile';
import insertElementAfter from '../common/insertElementAfter';

function addStatsQuickBuff(data) {
  var myPlayer = document.querySelector('div.player[data-username="' +
    data.username + '"]');
  var activity = myPlayer.querySelector('span.fshLastActivity');
  if (!activity) {
    activity = createSpan({className: 'fshLastActivity'});
    var player = myPlayer.getElementsByTagName('h1')[0];
    insertElementAfter(activity, player);
  }
  activity.innerHTML = 'Last Activity: ' +
    formatLastActivity(data.last_login) +
    '<br>Stamina: ' + data.current_stamina + ' / ' +
    data.stamina + ' ( ' + Math.floor(data.current_stamina /
    data.stamina * 100) + '% )';
}

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
  var lvlSpan = el.nextElementSibling.firstElementChild.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  var fshPlayerSpan = newPlayerSpan(el, playerSpan);
  var buffColor = getBuffColor(myLvl, playerBuffLevel);
  fshPlayerSpan.innerHTML = ' <span class="' + buffColor +
    '">[' + playerBuffLevel + ']</span>';
}

function hazBuff(playerData) {
  return function(el) {
    var myBuffName = el.getAttribute('data-name');
    var playerBuffLevel = playerData[myBuffName];
    var playerSpan = el.nextElementSibling.nextElementSibling;
    if (playerBuffLevel || playerSpan) {
      buffRunning(el, playerBuffLevel, playerSpan);
    }
  };
}

function makeBuffArray(player) {
  var buffList = player.parentNode.lastElementChild.textContent.split(',');
  return buffList.reduce(function(prev, curr) {
    if (curr.indexOf(' [') !== -1) {
      var foo = curr.split(' [');
      prev[foo[0].trim()] = parseInt(foo[1].replace(']', ''), 10);
    }
    return prev;
  }, {});
}

export default function addBuffLevels(evt) {
  var player = evt.target;
  if (player.tagName !== 'H1') {return;}
  getProfile(player.textContent).done(addStatsQuickBuff);
  var playerData = makeBuffArray(player);
  var nodeList = document.querySelectorAll('#buff-outer input[name]');
  Array.from(nodeList).forEach(hazBuff(playerData));
}
