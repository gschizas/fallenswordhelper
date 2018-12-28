import getElementsByTagName from '../common/getElementsByTagName';
import {imageServer} from '../system/system';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {moveOptions} from './assets';
import partial from '../common/partial';
import retryAjax from '../ajax/retryAjax';

var oldMoves = [];
var imgNodes;
var selectRow;

function doPickMove(moveId, slotId) {
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'arena',
      subcmd: 'dopickmove',
      move_id: moveId,
      slot_id: slotId
    }
  });
}

function getAllMoves() {
  return Array.from(getElementsByTagName('select', selectRow))
    .map(function(el) {return el.value;});
}

function resetMove(val, ind) {
  if (val === oldMoves[ind]) {return;}
  imgNodes.eq(ind).attr({
    src: imageServer + '/world/actionLoadingSpinner.gif',
    width: '25',
    height: '25'
  });
  return doPickMove('x', ind);
}

function newMove(val, ind) {
  if (val === 'x' || val === oldMoves[ind]) {return;}
  return doPickMove(val, ind);
}

function pageRefresh() {
  window.location = 'index.php?cmd=arena&subcmd=setup';
}

function changeMoves(newMoves) {
  var prm = newMoves.map(newMove);
  $.when.apply($, prm).done(pageRefresh);
}

function updateMoves() { // jQuery
  var newMoves = getAllMoves();
  var prm = newMoves.map(resetMove);
  $.when.apply($, prm).done(partial(changeMoves, newMoves));
}

function updateButton(table) { // jQuery
  var row = $('<tr><td colspan=32 align=center ' +
    'style="padding-top: 2px;padding-bottom: 2px;">' +
    '<input class="custombutton" value="Update" type="button">' +
    '</td></tr>');
  $('input', row).click(updateMoves);
  table.append(row);
}

function makeDropDown(row, i, e) { // jQuery
  var move = $(e).attr('src');
  if (move.indexOf('bar_icon_holder.jpg') > 0) {
    move = 'x';
  } else {
    move = move.match(/pvp\/(\d+).gif$/)[1];
  }
  oldMoves.push(move);
  var html = $(moveOptions);
  $('option[value=' + move + ']', html).prop('selected', true);
  row.append(html);
}

function pickerRow(table) { // jQuery
  var row = $('<tr/>');
  selectRow = row.get(0);
  row.append('<td/>');
  imgNodes.each(partial(makeDropDown, row));
  table.append(row);
}

function selectMoves(evt) { // jQuery
  $(evt.target).off();
  imgNodes = $('#pCC a[href*="=pickmove&"] img');
  var table = imgNodes.eq(0).closest('table').parent().closest('table');
  pickerRow(table);
  $('img[src$="pvp/bar_spacer.jpg"]', table).attr({width: '15', height: '50'});
  updateButton(table);
}

export default function setupMoves() { // jQuery
  if (jQueryNotPresent()) {return;}
  var node = $('#pCC b:contains("Setup Combat Moves")');
  if (node.length !== 1) {return;}
  node.addClass('fshLink fshGreen');
  node.click(selectMoves);
}
