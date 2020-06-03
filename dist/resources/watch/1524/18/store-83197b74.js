import { a4 as getTextTrim, H as querySelectorArray } from './calfSystem-940bc1b5.js';
import { g as get, s as set } from './idb-9fdca27d.js';
import './closest-3a8e7614.js';
import { f as fshArenaKey } from './assets-5d3515ba.js';
import { c as closestTd } from './closestTd-56c3b384.js';

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
//# sourceMappingURL=store-83197b74.js.map
