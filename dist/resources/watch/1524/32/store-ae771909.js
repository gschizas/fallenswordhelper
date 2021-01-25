import { c as closestTd } from './closestTd-33ff20e7.js';
import { f as fshArenaKey } from './assets-3768dd31.js';
import { G as getTextTrim, E as querySelectorArray } from './calfSystem-e64be67d.js';
import { g as get, s as set } from './idb-1d4ba436.js';
import './closest-331833f9.js';

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
//# sourceMappingURL=store-ae771909.js.map
