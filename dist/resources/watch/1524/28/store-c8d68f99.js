import { K as getTextTrim, E as querySelectorArray } from './calfSystem-21d16a0e.js';
import { g as get, s as set } from './idb-42714ac8.js';
import './closest-9ef1a6fc.js';
import { f as fshArenaKey } from './assets-48002450.js';
import { c as closestTd } from './closestTd-1e7ed1e3.js';

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
//# sourceMappingURL=store-c8d68f99.js.map
