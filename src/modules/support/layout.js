import * as system from './system';
import * as task from './task';

var dotList;
var dotCount;
var lastActivityRE =
  /<td>Last Activity:<\/td><td>(\d+)d (\d+)h (\d+)m (\d+)s<\/td>/;
var redDot = '<span class="redDot tip-static" data-tipped="Offline"></span>';
var greenDiamond =
  '<span class="greenDiamond tip-static" data-tipped="Online"></span>';
var yellowDiamond =
  '<span class="yellowDiamond tip-static" data-tipped="Offline"></span>';
var orangeDiamond =
  '<span class="orangeDiamond tip-static" data-tipped="Offline"></span>';
var offlineDot =
  '<span class="offlineDot tip-static" data-tipped="Offline"></span>';
var sevenDayDot =
  '<span class="sevenDayDot tip-static" data-tipped="Offline"></span>';

export var pCC = document.getElementById('pCC');

export function buffAllHref(shortList) { // Bad Pattern
  var _shortList = shortList.join(',').replace(/\s/g, '');
  var j = 'java';
  return j + 'script:openWindow(\'index.php?cmd=quickbuff&t=' + _shortList +
    '\', \'fsQuickBuff\', 618, 1000, \',scrollbars\')';
}

export function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + aPlayerId + (buffList ? '&blist=' + buffList : '') +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}

export function openQuickBuffById(aPlayerId) {
  window.openWindow('index.php?cmd=quickbuff&tid=' + aPlayerId,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export function openQuickBuffByName(aPlayerName) {
  window.openWindow('index.php?cmd=quickbuff&t=' + aPlayerName,
    'fsQuickBuff', 618, 1000, ',scrollbars');
}

export function infoBox(documentText) { // Native
  var doc = system.createDocument(documentText);
  var result;
  var infoMsg = doc.getElementById('info-msg');
  if (infoMsg) {
    var infoMatch = infoMsg.innerHTML;
    result = '';
    if (infoMatch) {
      infoMatch = infoMatch.replace(/<br.*/, '');
      result = infoMatch;
    }
  }
  return result;
}

export function guildId() { // Native
  var _guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {_guildId = parseInt(match[1], 10);}
  });
  system.setValue('guildId', _guildId);
  return _guildId;
}

export function playerId() { // Native
  var thePlayerId = parseInt(document.getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  system.setValue('playerID', thePlayerId);
  return thePlayerId;
}

export function playerName() {
  return document.getElementById('statbar-character').textContent;
}

export function makePageHeader(title, comment, spanId, button) { // Native
  return '<table width=100%><tbody><tr class="fshHeader">' +
    '<td width="90%"><b>&nbsp;' + title + '</b>' +
    (comment === '' ? '' : '&nbsp;(' + comment + ')') +
    '<td width="10%" class="fshBtnBox">' +
    (spanId ? '[<span class="fshLink" id="' +
    spanId + '">' + button + '</span>]' : '') +
    '</td></tr><tbody></table>';
}

export function makePageTemplate(title, comment, spanId, button, divId) { // Native
  return makePageHeader(title, comment, spanId, button) +
    '<div class="fshSmall" id="' + divId + '"></div>';
}

var getMins = [
  function(obj, min) {
    if (obj.day) {return min + parseInt(obj.day, 10) * 1440;}
    return min;
  },
  function(obj, min) {
    if (obj.hour) {return min + parseInt(obj.hour, 10) * 60;}
    return min;
  },
  function(obj, min) {
    if (obj.min) {return min + parseInt(obj.min, 10);}
    return min;
  },
  function(obj, min) {
    if (obj.last_login) {
      return Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
    }
    return min;
  },
  function(obj, min) {
    // last_login is 'false' over 30 days
    if ('last_login' in obj && !obj.last_login) {return 99999;}
    return min;
  }
];

var getDot = [
  {condition: 2, result: greenDiamond},
  {condition: 5, result: yellowDiamond},
  {condition: 30, result: orangeDiamond},
  {condition: 10080, result: offlineDot},
  {condition: 44640, result: sevenDayDot}
];

export function onlineDot(obj) { // Native
  var img = redDot;
  var min = getMins.reduce(function(prev, curr) {
    return curr(obj, prev);
  }, 0);
  getDot.some(function(el) {
    if (min < el.condition) {
      img = el.result;
      return true;
    }
    return false;
  });
  return img;
}

function changeOnlineDot(contactLink) { // Native
  var lastActivity = lastActivityRE
    .exec(contactLink.getAttribute('data-tipped'));
  contactLink.parentNode.previousSibling.innerHTML =
    onlineDot({
      min: lastActivity[3],
      hour: lastActivity[2],
      day: lastActivity[1]
    });
}

function batchDots() { // Native
  var limit = performance.now() + 5;
  while (performance.now() < limit &&
      dotCount < dotList.length) {
    changeOnlineDot(dotList[dotCount]);
    dotCount += 1;
  }
  if (dotCount < dotList.length) {
    task.add(3, batchDots);
  }
}

export function colouredDots() { // Native
  if (!system.getValue('enhanceOnlineDots')) {return;}
  dotList = document.querySelectorAll(
    '#pCC a[data-tipped*="Last Activity"]');
  dotCount = 0;
  task.add(3, batchDots);
}

export function confirm(title, msgText, fn) { // jQuery
  var fshMsg = document.getElementById('fshmsg');
  if (!fshMsg) {
    fshMsg = document.createElement('div');
    fshMsg.id = 'fshmsg';
    document.body.appendChild(fshMsg);
    $(fshMsg).dialog({
      autoOpen: false,
      dialogClass: 'no-close',
      draggable: false,
      modal: true,
      resizable: false,
    });
  }
  fshMsg.textContent = msgText;
  $(fshMsg).dialog('option', {
    buttons: {
      Yes: function() {
        fn();
        $(this).dialog('close');
      },
      No: function() {$(this).dialog('close');}
    },
    title: title
  })
  .dialog('open');
}
