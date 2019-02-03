import contains from '../../common/contains';
import createDocument from '../../system/createDocument';
import {def_statVl} from '../../support/constants';
import getArrayByTagName from '../../common/getArrayByTagName';
import {getElementById} from '../../common/getElement';
import getElementsByTagName from '../../common/getElementsByTagName';
import getText from '../../common/getText';
import intValue from '../../system/intValue';
import onlineDot from '../../common/onlineDot';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import {updateProgress} from './bufferProgress';

var sustainLevelRE = /Level<br>(\d+)%/;

function getBioLines(bioCellHtml, findBuffNicks) {
  var myRe = new RegExp('^.*\\b(?:(?:' +
    findBuffNicks.replace(/,/g, ')|(?:') + '))\\b.*$', 'gim');
  var myArray;
  var res = [];
  while ((myArray = myRe.exec(bioCellHtml)) !== null) {
    res.push(myArray[0]);
  }
  return res;
}

function getSustain(doc) {
  var sustainLink = getArrayByTagName('a',
    getElementById('profileLeftColumn', doc)).find(contains('Sustain'));
  if (sustainLink) {
    var sustainText = sustainLink.parentNode.parentNode.parentNode
      .nextElementSibling.children[0].dataset.tipped;
    return parseInt(sustainLevelRE.exec(sustainText)[1], 10) || -1;
  }
  return 0;
}

function getInnerPlayerName(doc) {
  return getText(getElementsByTagName('h1', getElementById('pCC', doc))[0]);
}

function getInnerLevelValue(doc) {
  return intValue(getText(getElementById('profileLeftColumn', doc)
    .children[4].children[0].rows[0].cells[1]));
}

function getInnerVirtualLevel(doc) {
  return parseInt(getText(getElementById(def_statVl, doc)), 10);
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

function openMsg(evt) {
  window.openQuickMsgDialog(evt.target.getAttribute('target_player'));
}

function doNameCell(o) {
  var newCell = o.newRow.insertCell(0);
  newCell.style.verticalAlign = 'top';
  newCell.innerHTML = nameCell(o.doc, o.callback, o.lastActivity,
    o.bioCellHtml);
  $('.a-reply').click(openMsg);
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

function injectTextLine(newCell, el) {
  newCell.innerHTML += el + '<br>';
}

function buffCell(newRow, textLineArray) {
  var newCell = newRow.insertCell(2);
  textLineArray.forEach(partial(injectTextLine, newCell));
}

function updateProcessed() {
  var processedBuffers = getElementById('buffersProcessed');
  var potentialBuffers =
    parseInt(getText(getElementById('potentialBuffers')), 10);
  var processedBuffersCount = parseInt(getText(processedBuffers), 10);
  processedBuffers.innerHTML = processedBuffersCount + 1;
  if (potentialBuffers === processedBuffersCount + 1) {
    updateProgress('Done.', 'blue');
  }
}

function calcLastActivity(doc) {
  var innerPcc = getElementById('pCC', doc);
  var lastActivityElement = getElementsByTagName('p', innerPcc)[0];
  return /(\d+) mins, (\d+) secs/.exec(getText(lastActivityElement));
}

function getExtend(doc) {
  return querySelector('img.tip-static[data-tipped*="Extend"]', doc);
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
