import { K as getTextTrim, E as querySelectorArray } from './calfSystem-c0288c6c.js';
import { g as get, s as set } from './idb-247b069e.js';
import './closest-a642edd4.js';
import { f as fshArenaKey } from './assets-4920d856.js';
import { c as closestTd } from './closestTd-3a03be58.js';

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
//# sourceMappingURL=store-240fbb1e.js.map
