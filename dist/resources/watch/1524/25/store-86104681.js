import { K as getTextTrim, E as querySelectorArray } from './calfSystem-0ffc234f.js';
import { g as get, s as set } from './idb-b52eaa3c.js';
import './closest-8d8d60b3.js';
import { f as fshArenaKey } from './assets-73a041e8.js';
import { c as closestTd } from './closestTd-7c1b92f2.js';

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
//# sourceMappingURL=store-86104681.js.map
