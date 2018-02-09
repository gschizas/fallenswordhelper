import {createSpan} from './common/cElement';
import fallback from './system/fallback';
import {getElementById} from './common/getElement';
import getProfile from './ajax/getProfile';
import insertElementAfter from './common/insertElementAfter';
import retryAjax from './ajax/retryAjax';
import {createDocument, formatLastActivity} from './system/system';

var retries = 0;
var quickBuffHeader =
  '<div id="helperQBheader"><table class="quickbuffTable"><thead><tr>' +
  '<th class="quickbuffTableHeader">Sustain</th>' +
  '<th class="quickbuffTableHeader">Fury Caster</th>' +
  '<th class="quickbuffTableHeader">Guild Buffer</th>' +
  '<th class="quickbuffTableHeader">Buff Master</th>' +
  '<th class="quickbuffTableHeader">Extend</th>' +
  '<th class="quickbuffTableHeader">Reinforce</th>' +
  '</tr></thead><tbody><tr>' +
  '<td id="fshSus" class="quickbuffTableDetail">&nbsp;</td>' +
  '<td id="fshFur" class="quickbuffTableDetail">&nbsp;</td>' +
  '<td id="fshGB"  class="quickbuffTableDetail">&nbsp;</td>' +
  '<td id="fshBM"  class="quickbuffTableDetail">&nbsp;</td>' +
  '<td id="fshExt" class="quickbuffTableDetail">&nbsp;</td>' +
  '<td id="fshRI"  class="quickbuffTableDetail">&nbsp;</td>' +
  '</tr></tbody></table></div>';
var excludeBuff = {
  'skill-50': 'Death Dealer',
  'skill-54': 'Counter Attack',
  'skill-55': 'Summon Shield Imp',
  'skill-56': 'Vision',
  'skill-60': 'Nightmare Visage',
  'skill-61': 'Quest Finder',
  'skill-98': 'Barricade',
  'skill-101': 'Severe Condition'
};

function getEnhancement(doc, enh, inject) {
  var enhLevel = doc[enh] || 0;
  var enhClass = 'fshLime';
  if (enhLevel < 100) {enhClass = 'fshRed';}
  inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
}

function timeUnit(value, unit) {
  if (value > 0) {return value.toString() + unit;}
  return '';
}

function buffTimeLeft(_s) {
  var m = Math.floor(_s / 60);
  var s = _s % 60;
  var buffTimeToExpire = timeUnit(m, 'm');
  if (m > 0 && s > 0) {buffTimeToExpire += ' ';}
  buffTimeToExpire += timeUnit(s, 's');
  return buffTimeToExpire;
}

function getBuff(doc, buff, inject) {
  var s = fallback(doc[buff], 0);
  if (s) {
    var buffTimeToExpire = buffTimeLeft(s);
    inject.innerHTML = '<span class="fshLime">On</span>&nbsp;<span ' +
      'class="fshBuffOn">(' + buffTimeToExpire + ')</span>';
  } else {
    var elem = getElementById('buff-outer')
      .querySelector('input[data-name="' + buff + '"]');
    if (elem) {
      inject.innerHTML = '<span class="quickbuffActivate" ' +
        'buffID="' + elem.getAttribute('value') + '">Activate</span>';
    } else {
      inject.innerHTML = '<span class="fshRed;">Off</span>';
    }
  }
}

function itWorked(result) {
  return result &&
    (result.textContent.indexOf(
      'current or higher level is currently active on') !== -1 ||
    result.textContent.indexOf('was activated on') !== -1);
}

function quickActivate(evt) { // jQuery
  var trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') {return;}
  var buffHref = '?cmd=quickbuff&subcmd=activate&targetPlayers=' +
    window.self + '&skills[]=' + trigger.getAttribute('buffID');
  retryAjax(buffHref).done(function(data) {
    var doc = createDocument(data);
    var result = doc.querySelector('#quickbuff-report font');
    if (itWorked(result)) {
      trigger.className = 'fshLime';
      trigger.innerHTML = 'On';
    }
  });
}

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

function hazBuff(playerData, el) {
  var myBuffName = el.getAttribute('data-name');
  var playerBuffLevel = playerData[myBuffName];
  var playerSpan = el.nextElementSibling.nextElementSibling;
  if (playerBuffLevel || playerSpan) {
    buffRunning(el, playerBuffLevel, playerSpan);
  }
}

function addBuffLevels(evt) {
  var player = evt.target;
  if (player.tagName !== 'H1') {return;}
  getProfile(player.textContent).done(addStatsQuickBuff);

  var playerData = player.parentNode.lastElementChild.textContent.split(',');
  playerData = playerData.reduce(function(prev, curr) {
    if (curr.indexOf(' [') !== -1) {
      var foo = curr.split(' [');
      prev[foo[0].trim()] = parseInt(foo[1].replace(']', ''), 10);
    }
    return prev;
  }, {});

  var buffOuter = getElementById('buff-outer');
  var nodeList = buffOuter.querySelectorAll('input[name]');

  Array.prototype.forEach.call(nodeList, hazBuff.bind(null, playerData));

}

function doLabels(el) {
  var nameSpan = el.firstElementChild;
  var dataTipped = nameSpan.dataset.tipped;
  var cost = el.previousElementSibling.getAttribute('data-cost');
  nameSpan.dataset.tipped = dataTipped
    .replace('</center>', '<br>Stamina Cost: ' + cost + '$&');
  var lvlSpan = nameSpan.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  if (!excludeBuff[el.getAttribute('for')] && myLvl < 125) {
    el.classList.add('fshDim');
  }
}

function waitForPlayer(firstPlayer) {
  return !firstPlayer && retries < 9;
}

function haveTargets() {
  var firstPlayer = getElementById('players')
    .getElementsByTagName('h1')[0];
  if (waitForPlayer(firstPlayer)) {
    retries += 1;
    setTimeout(haveTargets, 100);
    return;
  }
  if (!firstPlayer) {return;}
  firstPlayer.click();
}

function firstPlayerStats() {
  var targets = getElementById('targetPlayers')
    .getAttribute('value');
  if (targets && targets !== '') {haveTargets();}
}

function getSustain(responseText) {
  var enh = responseText._enhancements.reduce(function(prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  var skl = responseText._skills.reduce(function(prev, curr) {
    prev[curr.name] = curr.duration;
    return prev;
  }, {});
  getEnhancement(enh, 'Sustain', getElementById('fshSus'));
  getEnhancement(enh, 'Fury Caster', getElementById('fshFur'));
  getBuff(skl, 'Guild Buffer', getElementById('fshGB'));
  getBuff(skl, 'Buff Master', getElementById('fshBM'));
  getBuff(skl, 'Extend', getElementById('fshExt'));
  getBuff(skl, 'Reinforce', getElementById('fshRI'));

  getElementById('helperQBheader')
    .addEventListener('click', quickActivate);
  getElementById('players')
    .addEventListener('click', addBuffLevels);

  var labels = getElementById('buff-outer')
    .querySelectorAll('label[for^="skill-"]');
  Array.prototype.forEach.call(labels, doLabels);

  firstPlayerStats();

}

export default function injectQuickBuff() { // jQuery
  var quickbuffDiv = getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  quickbuffDiv.firstElementChild.insertAdjacentHTML('afterend',
    quickBuffHeader);
  getProfile(window.self).done(getSustain);
}
