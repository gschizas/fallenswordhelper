import { K as getTextTrim, E as querySelectorArray } from './calfSystem-2b1fed3f.js';
import { g as get, s as set } from './idb-549f3966.js';
import './closest-5107b89a.js';
import { f as fshArenaKey } from './assets-06ec229a.js';
import { c as closestTd } from './closestTd-afe77d52.js';

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
//# sourceMappingURL=store-d4b0b08e.js.map
