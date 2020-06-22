import { K as getTextTrim, E as querySelectorArray } from './calfSystem-995e3482.js';
import { g as get, s as set } from './idb-ece4ba5b.js';
import './closest-b63f74e7.js';
import { f as fshArenaKey } from './assets-c67ab991.js';
import { c as closestTd } from './closestTd-4ae9525b.js';

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
//# sourceMappingURL=store-f6e52d15.js.map
