import './newGuildLog.css';
import addGuildLogWidgets from '../../logs/addGuildLogWidgets';
import addLogColoring from '../../logs/addLogColoring';
import all from '../../common/all';
import createDocument from '../../system/createDocument';
import createTable from '../../common/cElement/createTable';
import eventHandler5 from '../../common/eventHandler5';
import functionPasses from '../../common/functionPasses';
import getArrayByTagName from '../../common/getArrayByTagName';
import getElementById from '../../common/getElement';
import getElementsByClassName from '../../common/getElementsByClassName';
import getGuildLogPage from './getGuildLogPage';
import getText from '../../common/getText';
import getTextTrim from '../../common/getTextTrim';
import getValue from '../../system/getValue';
import hideElement from '../../common/hideElement';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import onclick from '../../common/onclick';
import { pCC } from '../../support/layout';
import parseDateAsTimestamp from '../../system/parseDateAsTimestamp';
import partial from '../../common/partial';
import querySelector from '../../common/querySelector';
import rowProfile from './profiler';
import selfIdIs from '../../common/selfIdIs';
import setInnerHtml from '../../dom/setInnerHtml';
import setText from '../../dom/setText';
import toggleForce from '../../common/toggleForce';
import {
  defChecks, guildLogFilter, headerRow, noChecks,
} from './assets';
import { get, set } from '../../system/idb';

let options = {};
let fshNewGuildLog;
let fshOutput;
let maxPagesToFetch;
let maxPage;
let doc;
let currPage;
let lastPage;
let tmpGuildLog = [];
let completeReload = true;
let myTable;

function parsePage(data) {
  doc = createDocument(data);
  const pageInput = querySelector('input[name="page"]', doc);
  if (pageInput) {
    currPage = Number(pageInput.value);
    lastPage = Number(/\d+/.exec(getText(pageInput.parentNode))[0]);
    if (currPage === 1) { maxPage = Math.min(lastPage, maxPagesToFetch); }
    setText(`Loading ${currPage} of ${maxPage}...`, fshOutput);
  }
}

function seenRowBefore(timestamp, myMsg) {
  return [
    () => currPage === 1,
    () => options.log,
    () => options.log[0],
    () => options.log[0][0],
    () => timestamp === options.log[0][0],
    () => myMsg === options.log[0][2],
  ].every(functionPasses);
}

function getTableList(tableList) {
  const theTable = tableList[0];
  const limit = theTable.rows.length - 1;
  for (let i = 1; i < limit; i += 2) {
    const myRow = theTable.rows[i];
    const myDate = getTextTrim(myRow.cells[1]);
    const timestamp = parseDateAsTimestamp(myDate);
    const myMsg = myRow.cells[2].innerHTML;
    if (seenRowBefore(timestamp, myMsg)) {
      completeReload = false;
      break;
    }
    tmpGuildLog.push([currPage * 100 + i, timestamp, myDate, myMsg,
      rowProfile(myMsg)]);
  }
}

function parseTable() {
  const tableList = getElementsByClassName('width_full', doc);
  if (tableList.length === 1) { getTableList(tableList); }
}

function processPage(data) {
  parsePage(data);
  parseTable();
}

function useCache(e) { tmpGuildLog.push([0].concat(e)); }

function getOtherPages() {
  const prm = [];
  if (completeReload) {
    for (let i = 2; i <= maxPage; i += 1) {
      prm.push(getGuildLogPage(i).then(processPage));
    }
  } else {
    options.log.forEach(useCache);
  }
  return all(prm);
}

function storeOptions() { set('fsh_guildLog', options); }

function notThisMinute(nowUtc, ary) { return ary[1] !== nowUtc; }

function cacheValues(ary) { return ary.slice(1, 5); }

function updateOptionsLog() {
  // Don't cache current minute as it may be incomplete
  options.log = tmpGuildLog
    .filter(partial(notThisMinute, new Date().setSeconds(0, 0)))
    .map(cacheValues);
  storeOptions();
}

function makeCell(row, html) {
  const thisCell = row.insertCell(-1);
  setInnerHtml(html, thisCell);
  thisCell.className = 'row';
}

function dataRow(r) {
  const myRow = myTable.insertRow(-1);
  r.push(myRow);
  if (!options.checks[r[4]]) { myRow.className = 'fshHide'; }
  makeCell(myRow,
    '<span class="newGuildLog"></span>');
  makeCell(myRow, `<nobr>${r[2]}</nobr>`);
  makeCell(myRow, r[3]);
}

function separatorRow(r) {
  const sepRow = myTable.insertRow(-1);
  r.push(sepRow);
  if (!options.checks[r[4]]) { sepRow.className = 'fshHide'; }
  const sep = sepRow.insertCell(-1);
  sep.className = 'divider';
  sep.colSpan = 3;
}

function buildRow(r) {
  dataRow(r);
  separatorRow(r);
}

function buildTable() {
  myTable = createTable({ id: 'fshInjectHere', className: 'width_full' });
  insertHtmlBeforeEnd(myTable, headerRow);

  tmpGuildLog.forEach(buildRow);

  const injector = getElementById('fshInjectHere');
  pCC.replaceChild(myTable, injector);
  addLogColoring('myGuildLog', 1);
  addGuildLogWidgets();
}

function doChecked(el) {
  // eslint-disable-next-line no-param-reassign
  el.checked = options.checks[el.getAttribute('item')];
}

function setChecks() {
  getArrayByTagName('input', fshNewGuildLog).forEach(doChecked);
  storeOptions();
}

function byFirstElement(a, b) { return a[0] - b[0]; }

function gotOtherPages() {
  if (completeReload) { tmpGuildLog.sort(byFirstElement); }
  setText('Loading complete.', fshOutput);
  updateOptionsLog();
  buildTable();
}

function processFirstPage(data) {
  processPage(data);
  getOtherPages().then(gotOtherPages);
}

function toggle(item, hide, r) {
  if (r[4] !== item) { return; }
  toggleForce(r[5], hide);
  toggleForce(r[6], hide);
}

function toggleItem(target) {
  const item = Number(target.getAttribute('item'));
  options.checks[item] = !options.checks[item];
  storeOptions();
  tmpGuildLog.forEach(partial(toggle, item, !options.checks[item]));
}

function removeHide(el) {
  if (el && el.classList) { el.classList.remove('fshHide'); }
}

function show(r) {
  removeHide(r[5]);
  removeHide(r[6]);
}

function selectAll() {
  options.checks = defChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(show);
}

function doHide(r) {
  hideElement(r[5]);
  hideElement(r[6]);
}

function selectNone() {
  options.checks = noChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(doHide);
}

function refresh() {
  options.log = false;
  storeOptions();
  setText('Loading Page 1 ...', fshOutput);
  tmpGuildLog = [];
  completeReload = true;
  setInnerHtml('', getElementById('fshInjectHere'));
  getGuildLogPage(1).then(processFirstPage);
}

function guildLogEvents() {
  return [
    [(target) => target.tagName === 'INPUT', toggleItem],
    [selfIdIs('fshAll'), selectAll],
    [selfIdIs('fshNone'), selectNone],
    [selfIdIs('rfsh'), refresh],
  ];
}

function setOpts(guildLog) {
  options = guildLog || options;
  options.checks = options.checks || defChecks.slice(0);
}

function getElements() {
  fshNewGuildLog = getElementById('fshNewGuildLog');
  fshOutput = getElementById('fshOutput');
}

function setMaxPage() {
  maxPagesToFetch = Number(getValue('newGuildLogHistoryPages'));
  maxPage = maxPagesToFetch;
}

function gotOptions(guildLog) {
  setOpts(guildLog);
  setInnerHtml(guildLogFilter, pCC);
  getElements();
  onclick(fshNewGuildLog, eventHandler5(guildLogEvents()));
  setChecks();
  setMaxPage();
  getGuildLogPage(1).then(processFirstPage);
}

export default function injectNewGuildLog() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  get('fsh_guildLog').then(gotOptions);
}
