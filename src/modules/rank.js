import add from './support/task';
import createDocument from './system/createDocument';
import {createInput} from './common/cElement';
import {getElementById} from './common/getElement';
import getMembrList from './ajax/getMembrList';
import getValue from './system/getValue';
import insertElement from './common/insertElement';
import insertHtmlAfterBegin from './common/insertHtmlAfterBegin';
import insertHtmlBeforeEnd from './common/insertHtmlBeforeEnd';
import jQueryNotPresent from './common/jQueryNotPresent';
import moreToDo from './common/moreToDo';
import {pCC} from './support/layout';
import playerName from './common/playerName';
import retryAjax from './ajax/retryAjax';

var ranks;
var myRank;
var theRows;
var rankCount;
var characterRow;

var privLookup = {
  'Bank Withdraw': 5,
  'Build/Upgrade/Demolish Structures': 5,
  'Can Un-Tag Items': 5,
  'Build/Upgrade Structures': 4,
  'Can Kick Members': 4,
  'Can Mass Messages': 0.5,
  'Take Items': 0.2,
  'Can Recall Tagged Items': 0.2,
  'Store Items': 0.1,
  'Can View Advisor': 0.1
};

function parseRankData(linkElement, responseText) {
  // Makes a weighted calculation of available permissions and gets tax rate
  var doc = createDocument(responseText);
  var checkBoxes = doc.querySelectorAll(
    '#pCC input[type="checkbox"]:checked');
  var count = 0;
  Array.prototype.forEach.call(checkBoxes, function(checkbox) {
    var privName = checkbox.nextElementSibling.textContent.trim();
    if (privName in privLookup) {
      count += privLookup[privName];
    } else {count += 1;}
  });
  var taxRate = doc.querySelector('#pCC input[name="rank_tax"]').value;
  insertHtmlAfterBegin(linkElement, '<span class="fshBlue">(' +
    Math.round(10 * count) / 10 + ') Tax:(' + taxRate + '%)</span> ');
}

function fetchRankData() { // jQuery.min
  var calcButton = getElementById('getrankweightings');
  calcButton.classList.add('fshHide');
  var allItems = document.querySelectorAll('#pCC input[value="Edit"]');
  Array.prototype.forEach.call(allItems, function(anItem) {
    var targetNode = anItem.parentNode.parentNode.previousElementSibling;
    var href = /window\.location='(.*)';/.exec(anItem
      .getAttribute('onclick'))[1];
    retryAjax(href).done(parseRankData.bind(null, targetNode));
  });
}

function notValidRow(thisRankRowNum, targetRowNum, parentTable) {
  return characterRow >= Math.min(thisRankRowNum, targetRowNum) ||
    targetRowNum < 1 ||
    targetRowNum > parentTable.rows.length;
}

function getTargetRowNumber(val) {
  if (val === 'Up') {return -1;}
  return 2;
}

function getPxScroll(val) {
  if (val === 'Up') {return -22;}
  return 22;
}

function overrideUpDown(evt, val) {
  var onclickHREF = /window.location='(.*)';/
    .exec(evt.target.getAttribute('onclick'))[1];
  var thisRankRow = evt.target.parentNode.parentNode.parentNode;
  var thisRankRowNum = thisRankRow.rowIndex;
  var targetRowNum = thisRankRowNum + getTargetRowNumber(val);
  var parentTable = thisRankRow.parentNode;
  if (notValidRow(thisRankRowNum, targetRowNum, parentTable)) {return;}
  retryAjax(onclickHREF);
  var injectRow = parentTable.rows[targetRowNum];
  parentTable.insertBefore(thisRankRow, injectRow);
  var pxScroll = getPxScroll(val);
  window.scrollBy(0, pxScroll);
  evt.stopPropagation();
}

function ajaxifyRankControls(evt) {
  var val = evt.target.getAttribute('value');
  if (val === 'Up' || val === 'Down') {overrideUpDown(evt, val);}
}

function doButtons() {
  // gather rank info button
  var founder = getElementById('show-guild-founder-rank-name');
  if (founder) {
    var weightButton = createInput({
      id: 'getrankweightings',
      className: 'custombutton',
      type: 'button',
      value: 'Get Rank Weightings'
    });
    weightButton.addEventListener('click', fetchRankData);
    var theTd = founder.parentNode;
    insertHtmlBeforeEnd(theTd, '&nbsp;');
    insertElement(theTd, weightButton);
  }
  // var theTd = getElementById('show-guild-founder-rank-name') // TODO why wouldn't you be able to see this?
  //   .parentNode;

  if (getValue('ajaxifyRankControls')) {
    pCC.addEventListener('click',
      ajaxifyRankControls, true);
  }
}

function writeMembers(el) {
  var rankCell = el.firstElementChild;
  var rankName = rankCell.textContent;
  if (ranks[rankName]) { // has members
    if (rankName === myRank) {
      characterRow = rankCount; // limit for ajaxify later
    }
    insertHtmlBeforeEnd(rankCell, ' <span class="fshBlue">- ' +
      ranks[rankName].join(', ') + '</span>');
  }
}

function paintRanks() {
  var limit = performance.now() + 10;
  while (moreToDo(limit, rankCount, theRows)) {
    var el = theRows[rankCount];

    writeMembers(el);

    rankCount += 1;
  }
  if (rankCount < theRows.length) {
    add(3, paintRanks);
  }
}

function findTheRows() {
  var outerTable = pCC.lastElementChild.previousElementSibling;
  if (outerTable.rows && outerTable.rows.length > 13) {
    return outerTable.rows[13].firstElementChild.firstElementChild.rows;
  }
}

function getRanks(membrList) {
  ranks = Object.keys(membrList).reduce(function(prev, curr) {
    if (curr !== 'lastUpdate') {
      var rankName = membrList[curr].rank_name;
      prev[rankName] = prev[rankName] || [];
      prev[rankName].push(curr);
    }
    return prev;
  }, {});
  myRank = membrList[playerName()].rank_name;
  theRows = findTheRows();
  if (theRows) {
    rankCount = 1;
    add(3, paintRanks);
  }
}

export default function injectGuildRanks() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  getMembrList(true).done(function(membrList) {
    add(3, getRanks, [membrList]);
  });
  add(3, doButtons);
}
