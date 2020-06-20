import { aV as isObject, E as querySelectorArray, e as entries, s as partial, aW as defaults, d as defTable, O as isArray, x as jQueryNotPresent, W as sendEvent, aX as time, aY as timeEnd } from './calfSystem-b0234231.js';
import { s as setTipped } from './setTipped-d6c2ec67.js';
import { c as currentGuildId } from './currentGuildId-4c0a45a6.js';
import { i as intValue } from './intValue-639b8a5f.js';
import { s as set, g as get } from './idb-0eb46835.js';
import { i as interceptSubmit } from './interceptSubmit-e148f699.js';
import { c as closestTr } from './closestTr-c876e070.js';
import { l as lvlTest, p as playerLvlTest } from './lvlTests-9c500746.js';
import { l as loadDataTables } from './loadDataTables-ae87b91e.js';
import { a as allthen } from './allthen-f3edc27b.js';
import { c as changeMinMax } from './changeMinMax-97cd39f9.js';
import { f as fshArenaKey, a as arenaFilter, m as moveRe, t as tableOpts } from './assets-c532a14a.js';
import { a as arena$1 } from './arena-e4dc9dff.js';

function func(withPvpId, acc, [key, value]) {
  const thisBtn = withPvpId.find(([, id]) => id === key);
  if (thisBtn) {
    closestTr(thisBtn[0]).style.backgroundColor = '#ff0000';
    acc[key] = value;
  }
  return acc;
}

function arenaFull(obj) {
  if (!isObject(obj)) { return; }
  const theButtons = querySelectorArray(
    '#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]',
  );
  const withPvpId = theButtons.map((e) => [e, e.previousElementSibling.value]);
  const newObj = entries(obj).reduce(partial(func, withPvpId), {});
  set('fsh_arenaFull', newObj);
  return 0;
}

let opts;
let oldIds;

function storeOpts() {
  set(fshArenaKey, opts);
}

function newOpts(newMin, newMax) {
  opts = opts || {};
  opts.minLvl = newMin;
  opts.maxLvl = newMax;
  storeOpts();
}

function redrawTable() {
  $('#arenaTypeTabs table[width="635"]').DataTable().draw();
}

function changeLvls() { // jQuery
  changeMinMax(newOpts, redrawTable);
}

function resetLvls() { // jQuery
  newOpts(defaults.arenaMinLvl, defaults.arenaMaxLvl);
  $('#fshMinLvl').val(opts.minLvl);
  $('#fshMaxLvl').val(opts.maxLvl);
  redrawTable();
}

function hideMoves(evt) { // jQuery
  opts = opts || {};
  opts.hideMoves = evt.target.checked;
  storeOpts();
  $('.moveMax').toggle(!evt.target.checked);
}

function setOpts(arena) {
  opts = arena || {};
  oldIds = opts.id || {};
  opts.id = {};
}

function hazOpts(_settings, data) {
  const min = opts.minLvl;
  const max = opts.maxLvl;
  const level = intValue(data[7]);
  return lvlTest(playerLvlTest, level, min, max);
}

function lvlFilter(_settings, data) {
  if (opts) { return hazOpts(_settings, data); }
  return true;
}

function specFilter(_settings, _searchData, _index, rowData) {
  const test = 0;
  if (test) {
    return rowData[4]['@data-order'] === '0';
  }
  return true;
}

function doLvlFilter() {
  $.fn.dataTable.ext.search.push(lvlFilter);
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  specFilter
    $.fn.dataTable.ext.search.push(specFilter);
  }
}

function makeTheRow() {
  const theRow = $('#pCC > table > tbody > tr:nth-child(4)');
  theRow.clone().insertBefore(theRow).find('td').attr('height', '2');
  theRow.clone().insertAfter(theRow).find('td').attr('height', '1');
  return theRow;
}

function hideMovesCheckbox(aTable) { // jQuery
  const fshHideMoves = $('#fshHideMoves', aTable);
  if (opts && 'hideMoves' in opts) {
    fshHideMoves.prop('checked', opts.hideMoves);
    $('.moveMax').toggle(!opts.hideMoves);
  }
  fshHideMoves.on('click', hideMoves);
}

function minLvlValue(aTable) { // jQuery
  const fshMinLvl = $('#fshMinLvl', aTable);
  if (opts && 'minLvl' in opts) {
    fshMinLvl.val(opts.minLvl);
  } else {
    fshMinLvl.val(defaults.arenaMinLvl);
  }
}

function maxLvlValue(aTable) { // jQuery
  const fshMaxLvl = $('#fshMaxLvl', aTable);
  if (opts && 'maxLvl' in opts) {
    fshMaxLvl.val(opts.maxLvl);
  } else {
    fshMaxLvl.val(defaults.arenaMaxLvl);
  }
}

function eventHandlers(aTable) {
  $('#fshMinLvl, #fshMaxLvl', aTable).on('keyup', changeLvls);
  $('#fshReset', aTable).on('click', resetLvls);
}

function filterHeader() { // jQuery
  const theRow = makeTheRow();
  const aTable = $(arenaFilter);
  hideMovesCheckbox(aTable);
  minLvlValue(aTable);
  maxLvlValue(aTable);
  eventHandlers(aTable);
  $('td', theRow).append(aTable);
}

function colourNewRow(row, id) { // jQuery
  if (oldIds && !oldIds[id]) {
    row.css('background-color', '#F5F298');
    row.find('tr').css('background-color', '#F5F298');
  }
}

function checkTournamentId(row, theCells) { // jQuery
  const matches = /#\s(\d+)/.exec(theCells.eq(0).text());
  if ([matches, opts, opts.id].every(isObject)) {
    // eslint-disable-next-line prefer-destructuring
    opts.id[matches[1]] = matches[1];
    colourNewRow(row, matches[1]);
  }
}

function players(theCells) { // jQuery
  const cell = theCells.eq(1);
  const matches = /(\d+)\s\/\s(\d+)/.exec(cell.text());
  if (matches) {
    cell.attr('data-order',
      (Number(matches[1]) - Number(matches[2])) * 100 + Number(matches[2]));
  }
}

function joinCost(theCells) {
  const cell = theCells.eq(2);
  cell.attr('data-order', $('td', cell).first().text().replace(/[,\s]/g, ''));
}

function boolData(i, el) { // jQuery
  const matches = /(\d)\.png/.exec($('img', el).attr('src'));
  if (matches) { $(el).attr('data-order', matches[1]); }
}

function theBools(theCells) {
  theCells.slice(4, 7).each(boolData);
}

function hazMaxMoves(matches, row) { // jQuery
  if (opts.moves[matches[1]] && opts.moves[matches[1]] === 3) {
    row.addClass('moveMax');
  }
}

function optsHazMoves(cell, row) { // jQuery
  const matches = moveRe.exec($('img', cell).attr('src'));
  if (matches) {
    hazMaxMoves(matches, row);
    cell.attr('data-order', matches[1]);
  }
}

function maxMoves(theCells, row) { // jQuery
  const cell = theCells.eq(8);
  if (opts && opts.moves) {
    optsHazMoves(cell, row);
  }
}

function reward(theCells) { // jQuery
  const cell = theCells.eq(8);
  if (cell.children(defTable).length !== 1) { return; }
  cell.attr('data-order', cell.find('td').first().text().replace(/[,\s]/g, ''));
}

function prepareData(i, e) { // jQuery
  const row = $(e);
  const theCells = row.children();
  checkTournamentId(row, theCells);
  players(theCells);
  joinCost(theCells);
  theBools(theCells);
  maxMoves(theCells, row);
  reward(theCells);
}

function orderData(theTables) {
  const myRows = theTables.children('tbody').children('tr');
  myRows.each(prepareData);
}

var undefined$1 = undefined;

const addId = (e) => [e, Number(e.previousElementSibling.value)];

function addMeta(json, e) {
  if (json.r.arenas) {
    return e.concat(json.r.arenas.find((a) => a.id === e[1]));
  }
  return e;
}

function listPlayers(myGuild, p) {
  if (p.guild_id === myGuild) {
    return `<span class="fshRed">${p.name}</span>`;
  }
  return p.name;
}

function grey(el) {
  if (el && el.classList) { el.classList.add('fshGray'); }
}

const validMoves = (json, arena) => arena.reward_type === 1 && json.r.moves;

const findMove = (json, arena) => json.r.moves.find((a) => a.id === arena.reward);

const isMax = (thisMove) => thisMove && thisMove.max === 3;

const hasMax = (json, arena) => validMoves(json, arena) && isMax(findMove(json, arena));

function testMoves(json, [button, , arena]) {
  if (arena && hasMax(json, arena)) { grey(button); }
}

function testGuildies(myGuild, button, arena) {
  const fromMyGuild = arena.players.filter((p) => p.guild_id === myGuild)
    .length;
  const maxGuildies = arena.max_players / 4;
  if (fromMyGuild === maxGuildies) { grey(button); }
}

function hazPlayers(myGuild, button, arena) {
  setTipped(arena.players.map(partial(listPlayers, myGuild)).join('<br>'),
    button);
  button.classList.add('tip-static');
  if (myGuild && button.value === 'Join') {
    testGuildies(myGuild, button, arena);
  }
}

const arenaPlayerListChecks = [
  isObject,
  (e) => isArray(e.players),
  (e) => e.players.length > 0,
];

function decorate(myGuild, [button, , arena]) {
  if (arenaPlayerListChecks.every((f) => f(arena))) {
    hazPlayers(myGuild, button, arena);
  }
}

function participants(json) {
  if (!json.s || !isObject(json.r)) { return; }
  const theButtons = querySelectorArray(
    '#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]',
  );
  const withPvpId = theButtons.map(addId);
  const withMeta = withPvpId.map(partial(addMeta, json));
  withMeta.forEach(partial(decorate, currentGuildId()));
  withMeta.forEach(partial(testMoves, json));
  return 0;
}

const sortClasses = 'td.sorting, td.sorting_asc, td.sorting_desc';

function calculateSortOrder(target) {
  const classes = target.attr('class');
  const test = /sorting([^\s]+)/.exec(classes);
  if (test && test[1] === '_desc') { return 'asc'; }
  return 'desc';
}

function sortDataTable(target, myCol, sortOrder) { // jQuery
  const table = target.closest(defTable).DataTable();
  if (myCol !== 3) {
    table.order([3, 'asc'], [myCol, sortOrder]).draw();
  } else {
    table.order([3, sortOrder]).draw();
  }
}

function sortHandler(evt) { // jQuery
  const target = $(evt.target).closest('td');
  const sortOrder = calculateSortOrder(target);
  sortDataTable(target, target.index(), sortOrder);
}

function redoSort(tabs) {
  $(sortClasses, tabs).off('click');
  tabs.on('click', sortClasses, sortHandler);
}

function view() {
  return arena$1({ subcmd: 'view' });
}

function removeHiddenRows() {
  const hiddenRows = querySelectorArray(
    '#arenaTypeTabs tr[style="display: none;"]',
  );
  hiddenRows.forEach((n) => n.remove());
}

function redoHead(i, e) { // jQuery
  const firstRow = $('tr', e).first();
  $('a', firstRow).contents().unwrap();
  $(e).prepend($('<thead/>').append(firstRow));
}

function prepareEnv() {
  filterHeader();
  storeOpts();
  doLvlFilter();
}

function arenaDataTable(tabs, [arena, obj, json]) { // jQuery
  const theTables = $('table[width="635"]', tabs);
  theTables.each(redoHead);
  setOpts(arena);
  orderData(theTables);
  arenaFull(obj);
  participants(json);
  prepareEnv();
  theTables.DataTable(tableOpts);
  redoSort(tabs);
}

function process(tabs, values) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('arena.process');
  }
  removeHiddenRows();
  arenaDataTable(tabs, values);
  interceptSubmit();
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('arena.process');
  }
}

function injectArena() { // jQuery
  if (jQueryNotPresent()) { return; }
  const tabs = $('#arenaTypeTabs');
  if (tabs.length !== 1) { // Join error screen
    sendEvent('arena', 'Join error screen ?');
    return;
  }
  allthen([
    get(fshArenaKey),
    get('fsh_arenaFull'),
    view().catch(() => ({})),
    loadDataTables(),
  ],
  partial(process, tabs));
}

var arena = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': injectArena
});

export { arena as a, injectArena as i, view as v };
//# sourceMappingURL=arena-df28d283.js.map
