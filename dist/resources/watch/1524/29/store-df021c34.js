import { K as getTextTrim, E as querySelectorArray } from './calfSystem-b31646eb.js';
import { g as get, s as set } from './idb-5f2321bd.js';
import './closest-14c30e26.js';
import { f as fshArenaKey } from './assets-8c112bf6.js';
import { c as closestTd } from './closestTd-8eaae249.js';

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
//# sourceMappingURL=store-df021c34.js.map
