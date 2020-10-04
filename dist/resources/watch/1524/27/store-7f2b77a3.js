import { K as getTextTrim, E as querySelectorArray } from './calfSystem-975d976a.js';
import { g as get, s as set } from './idb-9c55d032.js';
import './closest-79b9364e.js';
import { f as fshArenaKey } from './assets-9f475ea8.js';
import { c as closestTd } from './closestTd-ba52d908.js';

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
//# sourceMappingURL=store-7f2b77a3.js.map
