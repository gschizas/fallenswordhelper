import {fshArenaKey} from './assets';
import getForage from '../ajax/getForage';
import jQueryNotPresent from '../common/jQueryNotPresent';
import partial from '../common/partial';
import setForage from '../ajax/setForage';

function getCounts(moves, i, e) {
  var self = $(e);
  var src = self.attr('src');
  var moveId = /(\d+)\.gif/.exec(src)[1];
  moves[moveId] = {};
  moves[moveId].count = Number(/(\d)$/
    .exec(self.closest('td').html())[1]);
  moves[moveId].href = src;
}

function gotMoves(_arena) { // jQuery
  var arena = _arena || {};
  arena.moves = {};
  var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
  arenaMoves.each(partial(getCounts, arena.moves));
  setForage(fshArenaKey, arena);
}

export default function storeMoves() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  getForage(fshArenaKey).done(gotMoves);
}
