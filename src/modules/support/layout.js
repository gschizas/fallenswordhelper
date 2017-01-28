import * as task from './task';
import * as system from './system';

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

export function buffAllHref(shortList) { // Bad Pattern
  shortList = shortList.join(',').replace(/\s/g, '');
  var j = 'java';
  return j + 'script:openWindow("index.php?cmd=quickbuff&t=' + shortList +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")';
}

export function quickBuffHref(playerId, buffList) { // Bad Pattern
  return 'href=\'javascript:window.openWindow("index.php?cmd=' +
    'quickbuff&tid=' + playerId + (buffList ? '&blist=' + buffList : '') +
    '", "fsQuickBuff", 618, 1000, ",scrollbars")\'';
}

export function infoBox(documentText) { // Native
  var doc = system.createDocument(documentText);
  var infoMatch = doc.getElementById('info-msg').innerHTML;
  var result = '';
  if (infoMatch) {
    infoMatch = infoMatch.replace(/<br.*/,'');
    result = infoMatch;
  }
  return result;
}

export function guildId() { // Native
  var guildId;
  var nodeList = document.body.getElementsByTagName('script');
  Array.prototype.forEach.call(nodeList, function getGuildId(el) {
    var match = el.textContent.match(/\s+guildId: ([0-9]+),/);
    if (match) {guildId = parseInt(match[1], 10);}
  });
  system.setValue('guildId', guildId);
  return guildId;
}

export function playerId() { // Native
  var thePlayerId = parseInt(document.getElementById('holdtext')
    .textContent.match(/fallensword.com\/\?ref=(\d+)/)[1], 10);
  system.setValue('playerID',thePlayerId);
  return thePlayerId;
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

export function notebookContent() { // Native
  return document.getElementById('pCC'); // new interface logic
}

export function onlineDot(obj) { // Native
  var img;
  var min = 0;
  if (obj.day) {min += parseInt(obj.day, 10) * 1440;}
  if (obj.hour) {min += parseInt(obj.hour, 10) * 60;}
  if (obj.min) {min += parseInt(obj.min, 10);}
  if (obj.last_login) {
    min = Math.floor(Date.now() / 60000) - Math.floor(obj.last_login / 60);
  }
  // last_login is 'false' over 30 days
  if ('last_login' in obj && !obj.last_login) {min = 99999;}
  if (min < 2) {img = greenDiamond;
  } else if (min < 5) {img = yellowDiamond;
  } else if (min < 30) {img = orangeDiamond;
  } else if (min < 10080) {img = offlineDot;
  } else if (min < 44640) {img = sevenDayDot;
  } else {img = redDot;}
  return img;
}

function changeOnlineDot(contactLink){ // Native
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
