import {closestTd} from '../common/closest';
import {fshArenaKey} from './assets';
import getForage from '../ajax/getForage';
import getTextTrim from '../common/getTextTrim';
import querySelectorArray from '../common/querySelectorArray';
import setForage from '../ajax/setForage';

function getCount(moveImg) {
  return /(\d)$/.exec(getTextTrim(closestTd(moveImg)))[1];
}

function getCounts(prev, moveImg) {
  var moveId = /(\d+)\.gif/.exec(moveImg.src)[1];
  prev[moveId] = {
    count: Number(getCount(moveImg)),
    href: moveImg.src
  };
  return prev;
}

function gotMoves(_arena) {
  var arena = _arena || {};
  var arenaMoves = querySelectorArray('#pCC img[vspace="4"]').slice(1);
  arena.moves = arenaMoves.reduce(getCounts, {});
  setForage(fshArenaKey, arena);
}

export default function storeMoves() {
  getForage(fshArenaKey).then(gotMoves);
}
