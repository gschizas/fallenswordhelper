import { a4 as getTextTrim, H as querySelectorArray } from './calfSystem-f6498976.js';
import { g as get, s as set } from './idb-19d381b0.js';
import './closest-07392fae.js';
import { f as fshArenaKey } from './assets-0f6cb8d5.js';
import { c as closestTd } from './closestTd-009d551b.js';

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
//# sourceMappingURL=store-a3d05b34.js.map
