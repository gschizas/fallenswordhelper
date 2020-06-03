import { a4 as getTextTrim, H as querySelectorArray } from './calfSystem-03895320.js';
import { g as get, s as set } from './idb-1121a73b.js';
import './closest-6956725d.js';
import { f as fshArenaKey } from './assets-15133e04.js';
import { c as closestTd } from './closestTd-25415d37.js';

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
//# sourceMappingURL=store-73805016.js.map
