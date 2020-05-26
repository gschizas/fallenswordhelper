import { a7 as get, aQ as getTextTrim, H as querySelectorArray, a5 as set } from './calfSystem-b469667c.js';
import { c as closest } from './closest-f93141b8.js';
import { f as fshArenaKey } from './assets-0754dcc2.js';

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
//# sourceMappingURL=store-d5de7986.js.map
