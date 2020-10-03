import { K as getTextTrim, E as querySelectorArray } from './calfSystem-c851a12c.js';
import { g as get, s as set } from './idb-6207cbac.js';
import './closest-c2515a48.js';
import { f as fshArenaKey } from './assets-d1187a02.js';
import { c as closestTd } from './closestTd-0e3beede.js';

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
//# sourceMappingURL=store-0e64ef0a.js.map
