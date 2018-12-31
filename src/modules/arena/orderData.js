import {def_table} from '../support/constants';
import isObject from '../common/isObject';
import partial from '../common/partial';
import {oldIds, opts} from './setOpts';

function colourNewRow(row, id) { // jQuery
  if (oldIds && !oldIds[id]) {
    row.css('background-color', '#F5F298');
    row.find('tr').css('background-color', '#F5F298');
  }
}

function checkTournamentId(row, theCells) { // jQuery
  var matches = /#\s(\d+)/.exec(theCells.eq(0).text());
  if ([matches, opts, opts.id].every(isObject)) {
    opts.id[matches[1]] = matches[1];
    colourNewRow(row, matches[1]);
  }
}

function players(theCells) { // jQuery
  var cell = theCells.eq(1);
  var matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
  if (matches) {
    cell.attr('data-order', matches[2] * 1000 + Number(matches[1]));
  }
}

function joinCost(theCells) {
  var cell = theCells.eq(2);
  cell.attr('data-order', $('td', cell).first().text().replace(/[,\s]/g, ''));
}

function boolData(theCells, i) { // jQuery
  var cell = theCells.eq(i);
  var matches = /(\d)\.gif/.exec($('img', cell).attr('src'));
  if (matches) {cell.attr('data-order', matches[1]);}
}

function theBools(theCells) {
  [4, 5, 6].forEach(partial(boolData, theCells));
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

function maxMoves(theCells, row) { // jQuery
  var cell = theCells.eq(8);
  if (opts && opts.moves) {
    optsHazMoves(cell, row);
  }
}

function reward(theCells) { // jQuery
  var cell = theCells.eq(8);
  if (cell.children(def_table).length !== 1) {return;}
  cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
}

function _orderData(i, e) { // jQuery
  var row = $(e);
  var theCells = row.children();
  checkTournamentId(row, theCells);
  players(theCells);
  joinCost(theCells);
  theBools(theCells);
  maxMoves(theCells, row);
  reward(theCells);
}

export default function orderData(theTables) {
  var myRows = theTables.children('tbody').children('tr');
  myRows.each(_orderData);
}
