import { c as closestTd } from './closestTd-3db60d2a.js';
import { f as fshArenaKey } from './assets-ad350aab.js';
import { G as getTextTrim, E as querySelectorArray } from './calfSystem-91adbec8.js';
import { g as get, s as set } from './idb-321c4955.js';
import './closest-77701dcf.js';

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
//# sourceMappingURL=store-41008a93.js.map
