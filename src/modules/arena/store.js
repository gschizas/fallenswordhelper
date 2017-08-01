import getForage from '../ajax/getForage';
import setForage from '../ajax/setForage';

function gotMoves(_arena) { // jQuery
  var arena = _arena || {};
  arena.moves = {};
  var arenaMoves = $('#pCC img[vspace="4"]').slice(1);
  arenaMoves.each(function(i, e) {
    var self = $(e);
    var src = self.attr('src');
    var moveId = /(\d+)\.gif/.exec(src)[1];
    arena.moves[moveId] = {};
    arena.moves[moveId].count = Number(/(\d)$/
      .exec(self.closest('td').html())[1]);
    arena.moves[moveId].href = src;
  });
  setForage('fsh_arena', arena);
}

export default function storeMoves() { // jQuery.min
  getForage('fsh_arena').done(gotMoves);
}
