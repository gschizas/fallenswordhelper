import { K as getTextTrim, E as querySelectorArray } from './calfSystem-dea093d3.js';
import { g as get, s as set } from './idb-8edbec07.js';
import './closest-d8e60c46.js';
import { f as fshArenaKey } from './assets-cc59cb67.js';
import { c as closestTd } from './closestTd-237d87b1.js';

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
//# sourceMappingURL=store-46dea36c.js.map
