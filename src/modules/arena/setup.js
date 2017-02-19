import * as ajax from '../support/ajax';
import * as assets from './assets';
import * as system from '../support/system';

var oldMoves = [];
var nodes;
var selectRow;

function updateMoves() { // jQuery
  var newMoves = [];
  $('select', selectRow).each(function(i, e) {
    newMoves.push($(e).val());
  });
  var prm = [];
  newMoves.forEach(function(val, ind) {
    if (val === oldMoves[ind]) {return;}
    prm.push(ajax.doPickMove('x', ind));
    nodes.eq(ind).attr({
      'src': system.imageServer + '/world/actionLoadingSpinner.gif',
      'width': '25',
      'height': '25'
    });
  });
  $.when.apply($, prm).done(function() {
    newMoves.forEach(function(val, ind) {
      if (val === 'x' || val === oldMoves[ind]) {return;}
      prm.push(ajax.doPickMove(val, ind));
    });
    $.when.apply($, prm).done(function() {
      window.location = 'index.php?cmd=arena&subcmd=setup';
    });
  });
}

function selectMoves(evt) { // jQuery
  $(evt.target).off();

  nodes =
    $('#pCC a[href^="index.php?cmd=arena&subcmd=pickmove&slot_id="] img');
  var table = nodes.eq(0).closest('table').parent().closest('table');

  var row = $('<tr/>');
  selectRow = row;
  row.append('<td/>');
  nodes.each(function(i, e) {
    var move = $(e).attr('src');
    if (move.indexOf('bar_icon_holder.jpg') > 0) {
      move = 'x';
    } else {
      move = move.match(/pvp\/(\d+).gif$/)[1];
    }
    var html = $(assets.moveOptions);
    $('option[value=' + move + ']', html).prop('selected', true);
    row.append(html);
  });
  table.append(row);

  $('img[src$="pvp/bar_spacer.jpg"]', table)
    .attr({'width': '15', 'height': '50'});

  row = $('<tr><td colspan=32 align=center ' +
    'style="padding-top: 2px;padding-bottom: 2px;">' +
    '<input class="custombutton" value="Update" type="button">' +
    '</td></tr>');
  $('input', row).click(updateMoves);
  table.append(row);
}

export function setupMoves() { // jQuery
  var node = $('#pCC b:contains("Setup Combat Moves")');
  if (node.length !== 1) {return;}
  node.addClass('fshLink fshGreen');
  node.click(selectMoves);
}
