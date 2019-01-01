import createDocument from '../../system/createDocument';
import {def_statVl} from '../../support/constants';
import fallback from '../../system/fallback';
import {getElementById} from '../../common/getElement';
import getElementsByTagName from '../../common/getElementsByTagName';
import intValue from '../../system/intValue';
import onlineDot from '../../common/onlineDot';
import uniq from '../../common/uniq';
import {updateProgress} from './bufferProgress';

var sustainLevelRE = /Level<br>(\d+)%/;

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

function extractLine(bioCellHtml, runningTotalPosition) {
  var prevBR = getPrevBr(bioCellHtml, runningTotalPosition);
  var nextBR = getNextBr(bioCellHtml, runningTotalPosition);
  var textLine = bioCellHtml.substr(prevBR + 4, nextBR - prevBR);
  return textLine.replace(/(`~)|(~`)|(\{b\})|(\{\/b\})/g, '');
}

function getBioLines(bioCellHtml, findBuffNicks) { // Legacy
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
      res.push(extractLine(bioCellHtml, runningTotalPosition));
    }
  }
  return uniq(res);
}

function getSustain(doc) {
  var aLinks = getElementsByTagName('a',
    getElementById('profileLeftColumn', doc));
  var sustainLevel;
  Array.prototype.some.call(aLinks, function(el) {
    if (el.textContent === 'Sustain') {
      var sustainText = el.parentNode.parentNode.parentNode.nextElementSibling
        .children[0].dataset.tipped;
      sustainLevel = parseInt(sustainLevelRE.exec(sustainText)[1], 10);
      return true;
    }
    return false;
  });
  return fallback(sustainLevel, -1);
}

function getInnerPlayerName(doc) {
  return getElementsByTagName('h1', getElementById('pCC', doc))[0].textContent;
}

function getInnerLevelValue(doc) {
  return intValue(getElementById('profileLeftColumn', doc)
    .children[4].children[0].rows[0].cells[1].textContent);
}

function getInnerVirtualLevel(doc) {
  return parseInt(getElementById(def_statVl, doc).textContent, 10);
}

function nameCell(doc, callback, lastActivity, bioCellHtml) { // Legacy
  var innerPlayerName = getInnerPlayerName(doc);
  var levelValue = getInnerLevelValue(doc);
  var virtualLevelValue = getInnerVirtualLevel(doc);
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
    '<span class="fshGrey">Level:&nbsp;</span>' + levelValue +
    '&nbsp;(' + virtualLevelValue + ')';
}

function doNameCell(o) {
  var newCell = o.newRow.insertCell(0);
  newCell.style.verticalAlign = 'top';
  newCell.innerHTML = nameCell(o.doc, o.callback, o.lastActivity,
    o.bioCellHtml);
  $('.a-reply').click(function(evt) {
    window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
  });
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

function playerInfoCell(newRow, lastActivity, sustainLevel, hasExtendBuff) {
  var newCell = newRow.insertCell(1);
  newCell.innerHTML = playerInfo(lastActivity, sustainLevel, hasExtendBuff);
  newCell.style.verticalAlign = 'top';
}

function buffCell(newRow, textLineArray) {
  var newCell = newRow.insertCell(2);
  textLineArray.forEach(function(el) {
    newCell.innerHTML += el + '<br>';
  });
}

function updateProcessed() {
  var processedBuffers = getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(getElementById('potentialBuffers').textContent, 10);
  var processedBuffersCount = parseInt(processedBuffers.textContent, 10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    updateProgress('Done.', 'blue');
  }
}

function calcLastActivity(doc) {
  var innerPcc = getElementById('pCC', doc);
  var lastActivityElement = getElementsByTagName('p', innerPcc)[0];
  return /(\d+) mins, (\d+) secs/.exec(lastActivityElement.textContent);
}

function getExtend(doc) {
  return doc.querySelector('img.tip-static[data-tipped*="Extend"]');
}

function addRowToTable(bioCellHtml, callback, doc, textLineArray) {
  var lastActivity = calcLastActivity(doc);
  var buffTable = getElementById('buffTable');
  var newRow = buffTable.insertRow(-1);
  doNameCell({
    newRow: newRow,
    doc: doc,
    callback: callback,
    lastActivity: lastActivity,
    bioCellHtml: bioCellHtml
  });
  playerInfoCell(newRow, lastActivity, getSustain(doc), getExtend(doc));
  buffCell(newRow, textLineArray);
}

export default function parseProfileAndDisplay(responseText, callback) { // Hybrid - Evil
  var doc = createDocument(responseText);
  var bioCellHtml = getElementById('profile-bio', doc).innerHTML;
  var textLineArray = getBioLines(bioCellHtml, callback.findBuffNicks);

  // add row to table
  if (textLineArray.length > 0) {
    addRowToTable(bioCellHtml, callback, doc, textLineArray);
  }
  updateProcessed();
}
