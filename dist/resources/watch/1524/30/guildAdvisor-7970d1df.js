import { n as cElement, a1 as playerIdUrl, a as add, s as partial, b as createDiv, i as insertElement, f as insertHtmlBeforeEnd, aW as time, A as setInnerHtml, aX as timeEnd, x as jQueryNotPresent, g as getElementsByTagName, p as pCC, K as getTextTrim, B as getText, M as arrayFrom, I as getElementsByClassName, a9 as cmdUrl, c as calf } from './calfSystem-d357ca6f.js';
import { a as addCommas } from './addCommas-508f0c08.js';
import './currentGuildId-bcd6f2c1.js';
import './idb-255a2314.js';
import { c as createTable } from './createTable-337c0681.js';
import './indexAjaxJson-e70729f5.js';
import './cmdExport-a9059769.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-8735ac4b.js';
import './all-36f83e81.js';
import { l as loadDataTables } from './loadDataTables-8cccad22.js';
import './guild-6076bd6b.js';
import { a as allthen } from './allthen-7d061027.js';
import { g as getMembrList } from './getMembrList-572d1f40.js';
import { d as daAdvisor } from './daAdvisor-27e3113e.js';
import { r as replaceChild } from './replaceChild-1b71706a.js';

function createTFoot(props) {
  return cElement('tfoot', props);
}

var css = "table.fshDataTable {\r\n  border: 1px solid black;\r\n  width: 650px;\r\n}\r\n";
var modules_0c1b5e64 = {};

const advisorColumns = [
  { title: '<div class="fshBold">Member</div>' },
  { title: '<div class="fshBold">Lvl</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Rank</div>', class: 'dt-center dt-nowrap' },
  {
    title: '<div class="fshBold">Gold From Deposits</div>',
    class: 'dt-center',
  },
  { title: '<div class="fshBold">Gold From Tax</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Gold Total</div>', class: 'dt-center' },
  { title: '<div class="fshBold">FSP</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Skill Cast</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Group Create</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Group Join</div>', class: 'dt-center' },
  { title: '<div class="fshBold">Relic</div>', class: 'dt-center' },
  { title: '<div class="fshBold">XP Contrib</div>', class: 'dt-center' },
];

function playerName(f, membrList) {
  if (!membrList[f]) { return f; }
  return `<a href="${playerIdUrl}${membrList[f].id}">${f}</a>`;
}

function playerLevel(f, membrList) {
  if (!membrList[f]) { return ''; }
  return membrList[f].level;
}

function playerRank(f, membrList) {
  if (!membrList[f]) { return ''; }
  return `<div class="fshAdvRank">${
    membrList[f].rank_name.trim()}</div>`;
}

function doTable(tbl, data, callback) { // jQuery
  $(tbl).DataTable({
    autoWidth: false,
    columnDefs: [{
      targets: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      orderSequence: ['desc', 'asc'],
    }],
    columns: advisorColumns,
    data,
    deferRender: true,
    initComplete: callback,
    lengthMenu: [[25, 50, -1], [25, 50, 'All']],
    pageLength: 25,
    stateDuration: 0,
    stateSave: true,
  });
}

function switcheroo(div, targetElement) {
  add(3, partial(replaceChild, div, targetElement));
}

function injectTable(targetElement, tfoot, data) {
  const div = createDiv();
  const tbl = createTable({ className: 'fshDataTable fshXSmall hover' });
  insertElement(div, tbl);
  insertElement(tbl, tfoot);
  add(3, doTable, [tbl, data, partial(switcheroo, div, targetElement)]);
  return div;
}

function returnAdvisorPage(list, e, response) {
  insertHtmlBeforeEnd(list.lastElementChild.lastElementChild,
    ` day ${e},`);
  return response.r;
}

function getAdvisorPage(list, e) { // jQuery.min
  return daAdvisor(e).then(partial(returnAdvisorPage, list, e));
}

function addElements(ary, v, i) {
  return v + ary[i];
}

function addAll(curr, el, i) {
  return {
    ...el,
    stats: el.stats.map(partial(addElements, curr[i].stats)),
  };
}

function addStuff(acc, curr) {
  return acc.map(partial(addAll, curr));
}

function reorgStats(el) {
  return {
    player: el.player,
    stats: [el.stats[6], el.stats[7], el.stats[6] + el.stats[7], el.stats[1],
      el.stats[2], el.stats[3], el.stats[4], el.stats[8], el.stats[5]],
  };
}

function addUpStats(args) {
  return args.slice(1).reduce(addStuff, args[0]).map(reorgStats);
}

function makeTotal(acc, curr) {
  return curr.stats.map(partial(addElements, acc));
}

function footerStats(acc, curr) {
  return `${acc}<td><u>${curr}</u></td>`;
}

function makeTfoot(added) {
  const stats = added.slice(1).reduce(makeTotal, added[0].stats).map(addCommas);
  return createTFoot({
    innerHTML: `<tr><td class="fshRight" colspan="3">Total: </td>${
      stats.reduce(footerStats, '')}</tr>`,
  });
}

function makeData(membrList, el) {
  const stats = el.stats.map(addCommas);
  return [
    playerName(el.player.name, membrList),
    playerLevel(el.player.name, membrList),
    playerRank(el.player.name, membrList),
  ].concat(stats);
}

function addAdvisorPages(list, [membrList, ...args]) {
  const added = addUpStats(args);
  injectTable(list,
    makeTfoot(added),
    added.map(partial(makeData, membrList)));
}

function injectAdvisorWeekly(list) { // jQuery
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('guildAdvisor.injectAdvisorWeekly');
  }
  setInnerHtml('<span class="fshCurveContainer fshFlex">'
    + '<span class="fshCurveEle fshCurveLbl fshOldSpinner"></span>'
    + '<span class="fshSpinnerMsg">&nbsp;Retrieving daily data ...</span>'
    + '</span>', list);

  const prm = [getMembrList(false)]
    .concat([1, 2, 3, 4, 5, 6, 7].map(partial(getAdvisorPage, list)));

  allthen(prm, partial(addAdvisorPages, list));
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('guildAdvisor.injectAdvisorWeekly');
  }
}

function getTfoot(list) {
  const totalRow = list.rows[list.rows.length - 1];
  const totalClone = totalRow.cloneNode(true);
  const tfoot = createTFoot();
  insertElement(tfoot, totalClone);
  const totalCell = totalClone.cells[0];
  totalCell.className = 'fshRight';
  totalCell.setAttribute('colspan', '3');
  return tfoot;
}

function cellText(cell, i) {
  if (i === 0) {
    return getTextTrim(cell);
  }
  return getText(cell);
}

function bodyText(membrList, row) {
  const foo = arrayFrom(row.cells, cellText);
  foo.splice(0, 1, playerName(foo[0], membrList),
    playerLevel(foo[0], membrList), playerRank(foo[0], membrList));
  return foo;
}

function getData(list, membrList) {
  return arrayFrom(list.rows).slice(1, -1)
    .map(partial(bodyText, membrList));
}

function summaryLink() {
  const updateInput = getElementsByClassName('custombutton', pCC);
  if (updateInput.length === 0) { return; }
  insertHtmlAfterEnd(updateInput[0], `<span> <a href="${cmdUrl
  }guild&subcmd=advisor&subcmd2=weekly">7-Day Summary</a></span>`);
}

function injectAdvisorDaily(list, membrList) {
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    time('guildAdvisor.injectAdvisorDaily');
  }
  const data = getData(list, membrList);
  const tfoot = getTfoot(list);
  injectTable(list, tfoot, data);
  summaryLink();
  // eslint-disable-next-line no-unused-labels, no-labels
  betaLbl: { //  Timing output
    timeEnd('guildAdvisor.injectAdvisorDaily');
  }
}

function switcher(list) {
  if (calf.subcmd2 === 'weekly') {
    injectAdvisorWeekly(list);
  } else {
    getMembrList(false).then(partial(injectAdvisorDaily, list));
  }
}

function injectAdvisor() {
  if (jQueryNotPresent()) { return; }
  const list = getElementsByTagName('table', pCC)[1];
  if (!list) { return; }
  loadDataTables().then(() => switcher(list));
}

export default injectAdvisor;
//# sourceMappingURL=guildAdvisor-7970d1df.js.map
