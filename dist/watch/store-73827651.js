import { ak as get, b7 as getTextTrim, M as querySelectorArray, ai as set } from './calfSystem-98d7118c.js';
import { c as closest } from './closest-3d46eee5.js';
import { f as fshArenaKey } from './assets-325dd726.js';

function closestTd(el) {
  return closest('TD', el);
}

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
//# sourceMappingURL=store-73827651.js.map
