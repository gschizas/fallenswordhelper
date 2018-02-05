import {defaults} from '../support/dataObj';
import fallback from '../system/fallback';
import getForage from '../ajax/getForage';
import {intValue} from '../system/system';
import isObject from '../common/isObject';
import setForage from '../ajax/setForage';
import {arenaFilter, dontPost, tableOpts} from './assets';
import {time, timeEnd} from '../support/debug';

var tabs;
var theTables;
var opts;
var oldIds;

function levelsAreNotNaN(minLvl, maxLvl) {
  return !isNaN(minLvl) && !isNaN(maxLvl);
}

function changeLvls() { // jQuery
  var minLvl = parseInt($('#fshMinLvl').val(), 10);
  var maxLvl = parseInt($('#fshMaxLvl').val(), 10);
  if (levelsAreNotNaN(minLvl, maxLvl)) {
    opts = fallback(opts, {});
    opts.minLvl = minLvl;
    opts.maxLvl = maxLvl;
    setForage('fsh_arena', opts);
    $('#arenaTypeTabs table[width="635"]').DataTable().draw();
  }
}

function resetLvls() { // jQuery
  opts = opts || {};
  opts.minLvl = defaults.arenaMinLvl;
  opts.maxLvl = defaults.arenaMaxLvl;
  setForage('fsh_arena', opts);
  $('#fshMinLvl').val(opts.minLvl);
  $('#fshMaxLvl').val(opts.maxLvl);
  $('#arenaTypeTabs table[width="635"]').DataTable().draw();
}

function hideMoves(evt) { // jQuery
  opts = opts || {};
  opts.hideMoves = evt.target.checked;
  setForage('fsh_arena', opts);
  $('.moveMax').toggle(!evt.target.checked);
}

function testIsNotDesc(test) {
  return test && test[1] === '_desc';
}

function sortHandler(evt) { // jQuery
  var self = $(evt.target).closest('td');
  var table = self.closest('table').DataTable();
  var myCol = self.index();
  var classes = self.attr('class');
  var test = /sorting([^\s]+)/.exec(classes);
  var sortOrder = 'desc';
  if (testIsNotDesc(test)) {sortOrder = 'asc';}
  if (myCol !== 3) {
    table.order([3, 'asc'], [myCol, sortOrder]).draw();
  } else {
    table.order([3, sortOrder]).draw();
  }
}

function hideMovesCheckbox(aTable) { // jQuery
  var fshHideMoves = $('#fshHideMoves', aTable);
  if (opts && 'hideMoves' in opts) {
    fshHideMoves.prop('checked', opts.hideMoves);
    $('.moveMax').toggle(!opts.hideMoves);
  }
  fshHideMoves.click(hideMoves);
}

function minLvlValue(aTable) { // jQuery
  var fshMinLvl = $('#fshMinLvl', aTable);
  if (opts && 'minLvl' in opts) {
    fshMinLvl.val(opts.minLvl);
  } else {
    fshMinLvl.val(defaults.arenaMinLvl);
  }
}

function maxLvlValue(aTable) { // jQuery
  var fshMaxLvl = $('#fshMaxLvl', aTable);
  if (opts && 'maxLvl' in opts) {
    fshMaxLvl.val(opts.maxLvl);
  } else {
    fshMaxLvl.val(defaults.arenaMaxLvl);
  }
}

function filterHeader() { // jQuery
  var theRow = $('#pCC > table > tbody > tr:nth-child(7)');
  theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
  theRow.clone().insertAfter(theRow).find('td').attr('height', '1');
  var aTable = $(arenaFilter);
  hideMovesCheckbox(aTable);
  minLvlValue(aTable);
  maxLvlValue(aTable);
  $('#fshMinLvl, #fshMaxLvl', aTable).keyup(changeLvls);
  $('#fshReset', aTable).click(resetLvls);
  $('td', theRow).append(aTable);
}

var doLvlFilter = [
  function(min) {return !min;},
  function(min, max) {return !max;},
  function(min, max) {return isNaN(min) && isNaN(max);},
  function(min, max, level) {return isNaN(min) && level <= max;},
  function(min, max, level) {return min <= level && isNaN(max);},
  function(min, max, level) {return min <= level && level <= max;}
];

function hazOpts(_settings, data) {
  var min = opts.minLvl;
  var max = opts.maxLvl;
  var level = intValue(data[7]);
  for (var i = 0; i < doLvlFilter.length; i += 1) {
    if (doLvlFilter[i](min, max, level)) {return true;}
  }
  return false;
}

function lvlFilter(_settings, data) {
  if (opts) {return hazOpts(_settings, data);}
  return true;
}

function players(cell) { // jQuery
  var matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
  if (matches) {
    cell.attr('data-order', matches[2] * 1000 + Number(matches[1]));
  }
}

function boolData(cell) { // jQuery
  var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
  if (matches) {cell.attr('data-order', matches[1]);}
}

function hazMaxMoves(matches, row) { // jQuery
  if (opts.moves[matches[1]] &&
    opts.moves[matches[1]].count === 3) {
    row.addClass('moveMax');
  }
}

function optsHazMoves(cell, row) { // jQuery
  var matches = /\/pvp\/(\d+)\.gif/.exec($('img', cell).attr('src'));
  if (matches) {
    hazMaxMoves(matches, row);
    cell.attr('data-order', matches[1]);
  }
}

function maxMoves(cell, row) { // jQuery
  if (opts && opts.moves) {
    optsHazMoves(cell, row);
  }
}

function reward(cell) { // jQuery
  if (cell.children('table').length !== 1) {return;}
  cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
}

function colourNewRow(row, id) { // jQuery
  if (oldIds && !oldIds[id]) {
    row.css('background-color', '#F5F298');
    row.find('tr').css('background-color', '#F5F298');
  }
}

function checkTournamentId(row, cell) { // jQuery
  var matches = /#\s(\d+)/.exec(cell.text());
  if ([matches, opts, opts.id].every(isObject)) {
    opts.id[matches[1]] = matches[1];
    colourNewRow(row, matches[1]);
  }
}

function orderData(i, e) { // jQuery
  var row = $(e);
  var theCells = row.children();
  var cell = theCells.eq(0);
  checkTournamentId(row, cell);
  players(theCells.eq(1));
  cell = theCells.eq(2);
  cell.attr('data-order', $('td', cell).first().text().replace(/[,\s]/g, ''));
  boolData(theCells.eq(4));
  boolData(theCells.eq(5));
  boolData(theCells.eq(6));
  maxMoves(theCells.eq(8), row);
  reward(theCells.eq(8));
}

function redoHead(i, e) { // jQuery
  var firstRow = $('tr', e).first();
  $('a', firstRow).contents().unwrap();
  $(e).prepend($('<thead/>').append(firstRow));
}

function process(arena) { // jQuery

  time('arena.process');

  theTables.each(redoHead);
  opts = arena || {};
  oldIds = opts.id || {};
  opts.id = {};
  var myRows = theTables.children('tbody').children('tr');
  myRows.each(orderData);
  filterHeader();
  setForage('fsh_arena', opts);
  $.fn.dataTable.ext.search.push(lvlFilter);
  theTables.DataTable(tableOpts);
  $('td.sorting, td.sorting_asc, td.sorting_desc', tabs).off('click');
  $('div.dataTables_filter').hide();
  tabs.on('click', 'td.sorting, td.sorting_asc, td.sorting_desc', sortHandler);
  tabs.on('click', 'input.custombutton[type="submit"]', dontPost);

  timeEnd('arena.process');

}

export default function injectArena() { // jQuery
  tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) {return;} // Join error screen
  theTables = $('table[width="635"]', tabs);
  getForage('fsh_arena').done(process);
}
