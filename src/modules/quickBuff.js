import * as ajax from './support/ajax';
import * as system from './support/system';

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

function getEnhancement(doc, enh, inject) { // Native
  var enhLevel = doc[enh] || 0;
  var enhClass = 'fshLime';
  if (enhLevel < 100) {enhClass = 'fshRed';}
  inject.innerHTML = '<span class="' + enhClass + '">' + enhLevel + '%</span>';
}

function timeUnit(value, unit) { // Native
  if (value > 0) {return value.toString() + unit;}
  return '';
}

function buffTimeLeft(_s) { // Native
  var m = Math.floor(_s / 60);
  var s = _s % 60;
  var buffTimeToExpire = timeUnit(m, 'm');
  if (m > 0 && s > 0) {buffTimeToExpire += ' ';}
  buffTimeToExpire += timeUnit(s, 's');
  return buffTimeToExpire;
}

function getBuff(doc, buff, inject) { // Native
  var s = system.fallback(doc[buff], 0);
  if (s) {
    var buffTimeToExpire = buffTimeLeft(s);
    inject.innerHTML = '<span class="fshLime">On</span>&nbsp;<span ' +
      'class="fshBuffOn">(' + buffTimeToExpire + ')</span>';
  } else {
    var elem = document.getElementById('buff-outer')
      .querySelector('input[data-name="' + buff + '"]');
    if (elem) {
      inject.innerHTML = '<span class="quickbuffActivate" ' +
        'buffID="' + elem.getAttribute('value') + '">Activate</span>';
    } else {
      inject.innerHTML = '<span class="fshRed;">Off</span>';
    }
  }
}

function quickActivate(evt) { // jQuery
  var trigger = evt.target;
  if (trigger.className !== 'quickbuffActivate') {return;}
  var buffHref = '?cmd=quickbuff&subcmd=activate&targetPlayers=' +
    window.self + '&skills[]=' + trigger.getAttribute('buffID');
  $.get(buffHref).done(function(data) {
    var doc = system.createDocument(data);
    var result = doc.querySelector('#quickbuff-report font');
    if (result &&
        (result.textContent.indexOf(
          'current or higher level is currently active on') !== -1 ||
        result.textContent.indexOf('was activated on') !== -1)) {
      trigger.className = 'fshLime';
      trigger.innerHTML = 'On';
    }
  });
}

function addStatsQuickBuff(data) { // Native
  var myPlayer = document.querySelector('div.player[data-username="' +
    data.username + '"]');
  var activity = myPlayer.querySelector('span.fshLastActivity');
  if (!activity) {
    activity = document.createElement('SPAN');
    activity.className = 'fshLastActivity';
    var player = myPlayer.getElementsByTagName('h1')[0];
    player.insertAdjacentElement('afterend', activity);
  }
  activity.innerHTML = 'Last Activity: ' +
    system.formatLastActivity(data.last_login) +
    '<br>Stamina: ' + data.current_stamina + ' / ' +
    data.stamina + ' ( ' + Math.floor(data.current_stamina /
    data.stamina * 100) + '% )';
}

function newPlayerSpan(el, playerSpan) { // Native
  if (!playerSpan) {
    var ret = document.createElement('SPAN');
    ret.className = 'fshPlayer';
    el.nextElementSibling.insertAdjacentElement('afterend', ret);
    return ret;
  }
  return playerSpan;
}

function getBuffColor(myLvl, playerBuffLevel) { // Native
  if (myLvl > playerBuffLevel) {return 'fshRed';}
  return 'fshGreen';
}

function hazBuff(playerData, el) { // Native
  var myBuffName = el.getAttribute('data-name');
  var playerBuffLevel = playerData[myBuffName];
  var playerSpan = el.nextElementSibling.nextElementSibling;
  if (!playerBuffLevel && !playerSpan) {return;}
  if (!playerBuffLevel) {
    playerSpan.innerHTML = '';
    return;
  }
  var lvlSpan = el.nextElementSibling.firstElementChild.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  playerSpan = newPlayerSpan(el, playerSpan);
  var buffColor = getBuffColor(myLvl, playerBuffLevel);
  playerSpan.innerHTML = ' <span class="' + buffColor +
    '">[' + playerBuffLevel + ']</span>';
}

function addBuffLevels(evt) { // Native
  var player = evt.target;
  if (player.tagName !== 'H1') {return;}
  ajax.getProfile(player.textContent).done(addStatsQuickBuff);

  var playerData = player.parentNode.lastElementChild.textContent.split(',');
  playerData = playerData.reduce(function(prev, curr) {
    if (curr.indexOf(' [') !== -1) {
      var bob = curr.split(' [');
      prev[bob[0].trim()] = parseInt(bob[1].replace(']', ''), 10);
    }
    return prev;
  }, {});

  var buffOuter = document.getElementById('buff-outer');
  var nodeList = buffOuter.querySelectorAll('input[name]');

  Array.prototype.forEach.call(nodeList, hazBuff.bind(null, playerData));

}

function doLabels(el) { // Native
  var nameSpan = el.firstElementChild;
  var dataTipped = nameSpan.getAttribute('data-tipped');
  var cost = el.previousElementSibling.getAttribute('data-cost');
  nameSpan.setAttribute('data-tipped', dataTipped
    .replace('</center>', '<br>Stamina Cost: ' + cost + '$&'));
  var lvlSpan = nameSpan.firstElementChild;
  var myLvl = parseInt(lvlSpan.textContent.replace(/\[|\]/g, ''), 10);
  if (!excludeBuff[el.getAttribute('for')] && myLvl < 125) {
    el.classList.add('fshDim');
  }
}

function haveTargets() { // Native
  var firstPlayer = document.getElementById('players')
    .getElementsByTagName('h1')[0];
  if (!firstPlayer && retries < 9) {
    retries += 1;
    setTimeout(haveTargets, 100);
    return;
  }
  if (!firstPlayer) {return;}
  firstPlayer.dispatchEvent(new MouseEvent('click', {bubbles: true}));
}

function firstPlayerStats() { // Native
  var targets = document.getElementById('targetPlayers')
    .getAttribute('value');
  if (targets && targets !== '') {haveTargets();}
}

function getSustain(responseText) { // Native
  var enh = responseText._enhancements.reduce(function(prev, curr) {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
  var skl = responseText._skills.reduce(function(prev, curr) {
    prev[curr.name] = curr.duration;
    return prev;
  }, {});
  getEnhancement(enh, 'Sustain', document.getElementById('fshSus'));
  getEnhancement(enh, 'Fury Caster', document.getElementById('fshFur'));
  getBuff(skl, 'Guild Buffer', document.getElementById('fshGB'));
  getBuff(skl, 'Buff Master', document.getElementById('fshBM'));
  getBuff(skl, 'Extend', document.getElementById('fshExt'));
  getBuff(skl, 'Reinforce', document.getElementById('fshRI'));

  document.getElementById('helperQBheader')
    .addEventListener('click', quickActivate);
  document.getElementById('players')
    .addEventListener('click', addBuffLevels);

  var labels = document.getElementById('buff-outer')
    .querySelectorAll('label[for^="skill-"]');
  Array.prototype.forEach.call(labels, doLabels);

  firstPlayerStats();

}

export default function injectQuickBuff() { // jQuery
  var quickbuffDiv = document.getElementById('quickbuff');
  if (!quickbuffDiv) {return;}
  quickbuffDiv.firstElementChild.insertAdjacentHTML('afterend',
    quickBuffHeader);
  ajax.getProfile(window.self).done(getSustain);
}
