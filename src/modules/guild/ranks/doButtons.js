import {daRankPosition} from '../../_dataAccess/_dataAccess';
import getValue from '../../system/getValue';
import insertElementBefore from '../../common/insertElementBefore';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import playerName from '../../common/playerName';
import toLowerCase from '../../common/toLowerCase';

var characterRow;

function notValidRow(thisRankRow, targetRowNum) {
  return characterRow >= Math.min(thisRankRow.rowIndex, targetRowNum) ||
    targetRowNum < 1 ||
    targetRowNum > thisRankRow.parentNode.rows.length;
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
  daRankPosition(toLowerCase(evt.target.value), matchRankId[1]);
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
  if (notValidRow(thisRankRow, targetRowNum)) {return;}
  shuffleRows(evt, thisRankRow, targetRowNum);
}

function upOrDown(evt) {
  return ['Up', 'Down'].includes(evt.target.value);
}

function ajaxifyRankControls(evt) {
  if (upOrDown(evt)) {overrideUpDown(evt);}
}

export function doButtons() {
  if (characterRow && getValue('ajaxifyRankControls')) {
    on(pCC, 'click', ajaxifyRankControls, true);
  }
}

export function setCharacterRow(row, thisRank) {
  if (thisRank && thisRank[1].includes(playerName())) {
    characterRow = row.rowIndex;
  }
}
