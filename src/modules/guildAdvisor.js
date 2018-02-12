import add from './support/task';
import addCommas from './system/addCommas';
import calf from './support/calf';
import createDocument from './system/createDocument';
import {createTFoot} from './common/cElement';
import fallback from './system/fallback';
import {getElementById} from './common/getElement';
import getMembrList from './ajax/getMembrList';
import insertElement from './common/insertElement';
import intValue from './system/intValue';
import {pCC} from './support/layout';
import retryAjax from './ajax/retryAjax';
import {time, timeEnd} from './support/debug';

var newSummary = {};
var advisorColumns = [
  {title: '<div class="fshBold">Member</div>'},
  {title: '<div class="fshBold">Lvl</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Rank</div>', 'class': 'dt-center dt-nowrap'},
  {
    title: '<div class="fshBold">Gold From Deposits</div>',
    'class': 'dt-center'
  },
  {title: '<div class="fshBold">Gold From Tax</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Gold Total</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">FSP</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Skill Cast</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Group Create</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Group Join</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">Relic</div>', 'class': 'dt-center'},
  {title: '<div class="fshBold">XP Contrib</div>', 'class': 'dt-center'}
];
var membrList;
var list;
var data = [];

function doTable() { // jQuery
  $(list).dataTable({
    pageLength: 25,
    lengthMenu: [[25, 50, -1], [25, 50, 'All']],
    autoWidth: false,
    columns: advisorColumns,
    stateSave: true,
    stateDuration: 0
  });
}

function summaryLink() {
  var updateInput = pCC.getElementsByClassName('custombutton');
  if (!updateInput) {return;}
  updateInput[0].insertAdjacentHTML('afterend', '<span> <a href="index.php' +
    '?cmd=guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>');
}

function playerName(f) {
  if (!membrList[f]) {return f;}
  return '<a href="index.php?cmd=profile&player_id=' +
    membrList[f].id + '">' + f + '</a>';
}

function playerLevel(f) {
  if (!membrList[f]) {return '';}
  return membrList[f].level;
}

function playerRank(f) {
  if (!membrList[f]) {return '';}
  return '<div class="fshAdvRank">' +
    membrList[f].rank_name + '</div>';
}

function injectAdvisorNew() {

  time('guildAdvisor.injectAdvisorNew');

  list = pCC.getElementsByTagName('TABLE')[1];
  if (!list) {return;}
  var totalRow = list.firstElementChild.lastElementChild;
  var totalCell = totalRow.firstElementChild;
  totalCell.className = 'fshRight';
  totalCell.setAttribute('colspan', '3');
  var tfoot = createTFoot();
  insertElement(tfoot, totalRow);
  list.className = 'fshXSmall hover';
  list.firstElementChild
    .removeChild(list.firstElementChild.firstElementChild);
  Array.prototype.forEach.call(list.rows, function(tr) {
    Array.prototype.forEach.call(tr.cells, function(td) {
      td.removeAttribute('bgcolor');
    });
    var tdOne = tr.cells[0];
    var username = tdOne.textContent.trim();
    tdOne.innerHTML = playerName(username);
    tdOne.insertAdjacentHTML('afterend', '<td>' + playerLevel(username) +
      '</td><td>' + playerRank(username) + '</td>');
  });
  insertElement(list, tfoot);
  add(3, doTable);
  summaryLink();

  timeEnd('guildAdvisor.injectAdvisorNew');

}

function returnAdvisorPage(e, response) {

  time('guildAdvisor.returnAdvisorPage' + e);

  list.lastElementChild.lastElementChild
    .insertAdjacentHTML('beforeend', ' day ' + e + ',');
  var doc = createDocument(response);
  var table = getElementById('pCC', doc).firstElementChild
    .firstElementChild.lastElementChild.firstElementChild.firstElementChild;
  var tr = table.rows;
  Array.prototype.forEach.call(tr, function(el) {
    var tds = el.cells;
    var member = tds[0].textContent.trim();
    if (member === 'Member') {return;}
    newSummary[member] = fallback(newSummary[member], {});
    newSummary[member].deposit =
      fallback(newSummary[member].deposit, 0) +
      intValue(tds[1].textContent);
    newSummary[member].tax = fallback(newSummary[member].tax, 0) +
      intValue(tds[2].textContent);
    newSummary[member].total = fallback(newSummary[member].total, 0) +
      intValue(tds[3].textContent);
    newSummary[member].fsp = fallback(newSummary[member].fsp, 0) +
      intValue(tds[4].textContent);
    newSummary[member].skills = fallback(newSummary[member].skills, 0) +
      intValue(tds[5].textContent);
    newSummary[member].grpCrt = fallback(newSummary[member].grpCrt, 0) +
      intValue(tds[6].textContent);
    newSummary[member].grpJoin =
      fallback(newSummary[member].grpJoin, 0) +
      intValue(tds[7].textContent);
    newSummary[member].relics = fallback(newSummary[member].relics, 0) +
      intValue(tds[8].textContent);
    newSummary[member].contrib =
      fallback(newSummary[member].contrib, 0) +
      intValue(tds[9].textContent);
  });

  timeEnd('guildAdvisor.returnAdvisorPage' + e);

}

function getAdvisorPage(e) { // jQuery
  return retryAjax({
    url: 'index.php',
    data: {
      no_mobile: 1,
      cmd: 'guild',
      subcmd: 'advisor',
      period: e
    }
  }).done(returnAdvisorPage.bind(null, e));
}

function displayAdvisor() { // jQuery

  time('guildAdvisor.displayAdvisor');

  list.className = 'fshXSmall hover';
  list.innerHTML = '<tfoot id="advTFoot"><tr><td class="fshRight" ' +
    'colspan="3">Total: </td><td><u>' +
    addCommas(newSummary['Total:'].deposit) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].tax) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].total) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].fsp) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].skills) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].grpCrt) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].grpJoin) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].relics) + '</u></td><td><u>' +
    addCommas(newSummary['Total:'].contrib) +
      '</u></td></tr></tfoot>';
  $(list).dataTable({
    data: data,
    pageLength: 25,
    lengthMenu: [[25, 50, -1], [25, 50, 'All']],
    autoWidth: false,
    columns: advisorColumns,
    stateSave: true,
    stateDuration: 0
  });

  timeEnd('guildAdvisor.displayAdvisor');

}

function addStats(f) {
  if (f === 'Total:') {return;}
  data.push([
    playerName(f),
    playerLevel(f),
    playerRank(f),
    addCommas(newSummary[f].deposit),
    addCommas(newSummary[f].tax),
    addCommas(newSummary[f].total),
    addCommas(newSummary[f].fsp),
    addCommas(newSummary[f].skills),
    addCommas(newSummary[f].grpCrt),
    addCommas(newSummary[f].grpJoin),
    addCommas(newSummary[f].relics),
    addCommas(newSummary[f].contrib),
  ]);
}

function addAdvisorPages() {
  Object.keys(newSummary).forEach(addStats);
  add(3, displayAdvisor);
}

function injectAdvisorWeekly() { // jQuery

  time('guildAdvisor.injectAdvisorWeekly');

  list = pCC.firstElementChild.firstElementChild
    .lastElementChild.firstElementChild.firstElementChild;
  if (!list) {return;}
  list.innerHTML = '<span class="fshCurveContainer fshFlex">' +
    '<span class="fshCurveEle fshCurveLbl fshOldSpinner"></span>' +
    '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>' +
    '</span>';

  $.when(
    getMembrList(false)
      .done(function(response) {
        membrList = response;
      }),
    getAdvisorPage(1),
    getAdvisorPage(2),
    getAdvisorPage(3),
    getAdvisorPage(4),
    getAdvisorPage(5),
    getAdvisorPage(6),
    getAdvisorPage(7)
  ).done(function() {
    add(3, addAdvisorPages);
  });

  timeEnd('guildAdvisor.injectAdvisorWeekly');

}

export default function injectAdvisor() {
  if (typeof $ !== 'function') {return;}
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly();
  } else {
    getMembrList(false).done(function(response) {
      membrList = response;
      add(3, injectAdvisorNew);
    });
  }
}
