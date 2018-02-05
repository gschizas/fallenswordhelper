import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';
import {onlineDot} from '../support/layout';
import {bufferProgress, findBuffNicks} from './findBuffs';
import {
  createDocument,
  intValue
} from '../system/system';

var sustainLevelRE = /Level<br>(\d+)%/;

function uniq(arr, removeBy) {
  var seen = {};
  if (removeBy) {
    return arr.filter(function(item) {
      if (seen[item[removeBy]]) {return false;}
      seen[item[removeBy]] = true;
      return true;
    });
  }
  return arr.filter(function(item) {
    if (seen[item]) {return false;}
    seen[item] = true;
    return true;
  });
}

function getPrevBr(bioCellHtml, runningTotalPosition) { // Legacy
  var prevBR = bioCellHtml.lastIndexOf('<br>', runningTotalPosition - 1);
  if (prevBR === -1) {return 0;}
  return prevBR;
}

function getNextBr(bioCellHtml, runningTotalPosition) { // Legacy
  var nextBR = bioCellHtml.indexOf('<br>', runningTotalPosition);
  if (nextBR === -1 && bioCellHtml.indexOf('<br>') !== -1) {
    return bioCellHtml.length - 5;
  }
  return nextBR;
}

function getBioLines(bioCellHtml) { // Legacy
  var res = [];
  var buffPosition = 0;
  var startingPosition = 0;
  var runningTotalPosition = 0;
  var bioTextToSearch = ' ' + bioCellHtml + ' ';
  var buffRE = new RegExp('[^a-zA-Z]((' +
    findBuffNicks.replace(/,/g, ')|(') + '))[^a-zA-Z]', 'i');
  while (buffPosition !== -1) {
    bioTextToSearch = bioTextToSearch.substr(startingPosition,
      bioTextToSearch.length);
    buffPosition = bioTextToSearch.search(buffRE);
    if (buffPosition !== -1) {
      startingPosition = buffPosition + 1;
      runningTotalPosition += buffPosition;
      var prevBR = getPrevBr(bioCellHtml, runningTotalPosition);
      var nextBR = getNextBr(bioCellHtml, runningTotalPosition);
      var textLine = bioCellHtml.substr(prevBR + 4, nextBR - prevBR);
      textLine = textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
      res.push(textLine);
    }
  }
  return uniq(res);
}

function getSustain(doc) {
  var aLinks = getElementById('profileLeftColumn', doc)
    .getElementsByTagName('a');
  var sustainLevel;
  Array.prototype.some.call(aLinks, function(el) {
    if (el.textContent === 'Sustain') {
      var sustainText = el.parentNode.parentNode.parentNode.nextElementSibling
        .firstElementChild.dataset.tipped;
      sustainLevel = parseInt(sustainLevelRE.exec(sustainText)[1], 10);
      return true;
    }
    return false;
  });
  return fallback(sustainLevel, -1);
}

function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
  var innerPlayerName = getElementById('pCC', doc)
    .getElementsByTagName('h1')[0].textContent;
  var levelValue = intValue(getElementById('profileLeftColumn', doc)
    .children[4].children[0].rows[0].cells[1].textContent);
  var virtualLevelValue = parseInt(getElementById('stat-vl', doc)
    .textContent, 10);
  var lastActivityMinutes = parseInt(lastActivity[1], 10);
  var lastActivityIMG = onlineDot({min: lastActivityMinutes});
  var playerHREF = callback.href;
  var bioTip = bioCellHtml.replace(/'|"|\n/g, '');
  return '<nobr>' + lastActivityIMG + '&nbsp;<a href="' +
    playerHREF + '" target="new" ' +
    // FIXME - It kind works now, but not guaranteed?
    'class="tip-static" ' +
    'data-tipped="' + bioTip + '">' + innerPlayerName + '</a>' +
    '&nbsp;<span class="fshBlue">[<span class="a-reply fshLink" ' +
    'target_player="' + innerPlayerName + '">m</span>]</span></nobr><br>' +
    '<span class="fshGray">Level:&nbsp;</span>' + levelValue +
    '&nbsp;(' + virtualLevelValue + ')';
}

function playerInfo(lastActivity, sustainLevel, hasExtendBuff) { // Legacy
  var sustain = 'fshRed';
  if (sustainLevel >= 100) {sustain = 'fshGreen';}
  var extend = '<span class="fshRed">No</span>';
  if (hasExtendBuff) {extend = '<span class="fshGreen">Yes</span>';}
  return '<table><tbody><tr>' +
    '<td colspan="2" class="resAct">Last Activity:</td>' +
    '<td colspan="2"><nobr>' + lastActivity[0] + '</nobr></td></tr>' +
    '<tr><td class="resLbl">Sustain:' +
    '</td><td class="resVal ' + sustain + '">' + sustainLevel + '%</td>' +
    '<td class="resLbl">Extend:</td>' +
    '<td class="resVal">' + extend + '</td></tr>';
}

export default function parseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
  var doc = createDocument(responseText);
  // name and level
  var innerPcc = getElementById('pCC', doc);
  // last activity
  var lastActivityElement = innerPcc.getElementsByTagName('p')[0];
  var lastActivity = /(\d+) mins, (\d+) secs/
    .exec(lastActivityElement.textContent);
  // buffs
  var bioCellHtml = getElementById('profile-bio', doc).innerHTML;
  var buffTable = getElementById('buffTable');
  var textLineArray = getBioLines(bioCellHtml);
  // sustain
  var sustainLevel = getSustain(doc);
  // extend
  var hasExtendBuff = doc.querySelector(
    'img.tip-static[data-tipped*="Extend"]');

  // add row to table
  if (textLineArray.length > 0) {
    var newRow = buffTable.insertRow(-1);
    // name cell
    var newCell = newRow.insertCell(0);
    newCell.style.verticalAlign = 'top';
    newCell.innerHTML = nameCell(doc, callback, lastActivity, bioCellHtml);
    $('.a-reply').click(function(evt) {
      window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
    });

    // player info cell
    newCell = newRow.insertCell(1);
    newCell.innerHTML = playerInfo(lastActivity, sustainLevel, hasExtendBuff);
    newCell.style.verticalAlign = 'top';
    // buff cell
    newCell = newRow.insertCell(2);
    textLineArray.forEach(function(el) {
      newCell.innerHTML += el + '<br>';
    });
  }
  var processedBuffers = getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(getElementById('potentialBuffers').textContent, 10);
  var processedBuffersCount = parseInt(processedBuffers.textContent, 10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    bufferProgress.innerHTML = 'Done.';
    bufferProgress.style.color = 'blue';
  }
}
