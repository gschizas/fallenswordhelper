import { a4 as getTextTrim, H as querySelectorArray } from './calfSystem-6e4b53e3.js';
import { g as get, s as set } from './idb-fc617077.js';
import './closest-c88159b8.js';
import { f as fshArenaKey } from './assets-39ed51d4.js';
import { c as closestTd } from './closestTd-945f50ae.js';

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
//# sourceMappingURL=store-c07c936c.js.map
