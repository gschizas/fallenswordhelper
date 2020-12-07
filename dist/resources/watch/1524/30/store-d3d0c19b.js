import { K as getTextTrim, E as querySelectorArray } from './calfSystem-d357ca6f.js';
import { g as get, s as set } from './idb-255a2314.js';
import './closest-3bdef2f3.js';
import { f as fshArenaKey } from './assets-c6a1020c.js';
import { c as closestTd } from './closestTd-6666fe44.js';

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
//# sourceMappingURL=store-d3d0c19b.js.map
