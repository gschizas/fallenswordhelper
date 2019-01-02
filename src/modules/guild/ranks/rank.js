import add from '../../support/task';
import batch from '../../common/batch';
import getMembrList from '../../ajax/getMembrList';
import getValue from '../../system/getValue';
import insertElementBefore from '../../common/insertElementBefore';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import playerName from '../../common/playerName';
import rankPosition from '../../app/guild/ranks/position';
import weightings from './weightings';

var ranks;
var myRank;
var theRows;
var characterRow;

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

function shuffleRows(evt, thisRankRow, targetRowNum) {
  var matchRankId = evt.target.getAttribute('onclick').match(/rank_id=(\d+)/);
  rankPosition(evt.target.value.toLowerCase(), matchRankId[1]);
  var injectRow = thisRankRow.parentNode.rows[targetRowNum];
  insertElementBefore(thisRankRow, injectRow);
  var pxScroll = getPxScroll(evt.target.value);
  window.scrollBy(0, pxScroll);
  evt.stopPropagation();
}

function overrideUpDown(evt) {
  var thisRankRow = evt.target.parentNode.parentNode.parentNode;
  var targetRowNum = thisRankRow.rowIndex +
    getTargetRowNumber(evt.target.value);
  if (notValidRow(
    thisRankRow.rowIndex, targetRowNum, thisRankRow.parentNode
  )) {return;}
  shuffleRows(evt, thisRankRow, targetRowNum);
}

function ajaxifyRankControls(evt) {
  if (['Up', 'Down'].includes(evt.target.value)) {overrideUpDown(evt);}
}

function doButtons() {
  weightings();
  if (getValue('ajaxifyRankControls')) {
    on(pCC, 'click', ajaxifyRankControls, true);
  }
}

function isMyRank(rankCell, rankName) {
  if (rankName === myRank) {
    characterRow = rankCell.parentNode.rowIndex; // limit for ajaxify later
  }
}

function hasMembers(rankCell, rankName) {
  if (ranks[rankName]) { // has members
    isMyRank(rankCell, rankName);
    insertHtmlBeforeEnd(rankCell, ' <span class="fshBlue">- ' +
      ranks[rankName].join(', ') + '</span>');
  }
}

function getRankName(rankCell) {
  if (rankCell.parentNode.rowIndex === 1) {return 'Guild Founder';}
  return rankCell.textContent;
}

function writeMembers(el) {
  var rankCell = el.children[0];
  var rankName = getRankName(rankCell);
  hasMembers(rankCell, rankName);
}

function findTheRows() {
  var outerTable = pCC.lastElementChild.previousElementSibling;
  if (outerTable.rows && outerTable.rows.length > 7) {
    return outerTable.rows[7].children[0].children[0].rows;
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
    batch(3, theRows, 1, writeMembers);
  }
}

export default function injectGuildRanks() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  getMembrList(true).done(function(membrList) {
    add(3, getRanks, [membrList]);
  });
  add(3, doButtons);
}
