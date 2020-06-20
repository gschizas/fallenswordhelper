import { K as getTextTrim, E as querySelectorArray } from './calfSystem-b0234231.js';
import { g as get, s as set } from './idb-0eb46835.js';
import './closest-35d154f1.js';
import { f as fshArenaKey } from './assets-c532a14a.js';
import { c as closestTd } from './closestTd-04e26cdf.js';

function getCount(moveImg) {
  return /(\d)$/.exec(getTextTrim(closestTd(moveImg)))[1];
}

function getCounts(acc, moveImg) {
  const moveId = /(\d+)\.png/.exec(moveImg.src)[1];
  acc[moveId] = Number(getCount(moveImg));
  return acc;
}

function gotMoves(_arena) {
  const arena = _arena || {};
  const arenaMoves = querySelectorArray('#pCC img[vspace="4"]').slice(1);
  arena.moves = arenaMoves.reduce(getCounts, {});
  set(fshArenaKey, arena);
}

function storeMoves() {
  get(fshArenaKey).then(gotMoves);
}

export default storeMoves;
//# sourceMappingURL=store-bb222e61.js.map
