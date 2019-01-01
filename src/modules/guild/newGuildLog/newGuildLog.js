import addGuildLogWidgets from '../../logs/addGuildLogWidgets';
import addLogColoring from '../../logs/addLogColoring';
import createDocument from '../../system/createDocument';
import {createTable} from '../../common/cElement';
import eventHandler5 from '../../common/eventHandler5';
import functionPasses from '../../common/functionPasses';
import {getElementById} from '../../common/getElement';
import getElementsByTagName from '../../common/getElementsByTagName';
import getForage from '../../ajax/getForage';
import getGuildLogPage from './getGuildLogPage';
import getValue from '../../system/getValue';
import hideElement from '../../common/hideElement';
import {imageServer} from '../../system/system';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import on from '../../common/on';
import {pCC} from '../../support/layout';
import parseDateAsTimestamp from '../../system/parseDateAsTimestamp';
import {rowProfile} from './profiler';
import setForage from '../../ajax/setForage';
import toggleForce from '../../common/toggleForce';
import {defChecks, guildLogFilter, headerRow, noChecks} from './assets';

var options = {};
var fshNewGuildLog;
var fshOutput;
var maxPagesToFetch;
var maxPage;
var doc;
var currPage;
var lastPage;
var tmpGuildLog = [];
var completeReload = true;
var myTable;

function parsePage(data) {
  doc = createDocument(data);
  var pageInput = doc.querySelector('input[name="page"]');
  currPage = Number(pageInput.value);
  lastPage = Number(/\d+/.exec(pageInput.parentNode.textContent)[0]);
  if (currPage === 1) {maxPage = Math.min(lastPage, maxPagesToFetch);}
  fshOutput.textContent = 'Loading ' + currPage + ' of ' + maxPage + '...';
}

function seenRowBefore(timestamp, myMsg) {
  return [
    function() {return currPage === 1;},
    function() {return options.log;},
    function() {return options.log[0];},
    function() {return options.log[0][0];},
    function() {return timestamp === options.log[0][0];},
    function() {return myMsg === options.log[0][2];}
  ].every(functionPasses);
}

function getTableList(tableList) {
  var theTable = tableList[0];
  var limit = theTable.rows.length - 1;
  for (var i = 1; i < limit; i += 2) {
    var myRow = theTable.rows[i];
    var myDate = myRow.cells[1].textContent;
    var timestamp = parseDateAsTimestamp(myDate);
    var myMsg = myRow.cells[2].innerHTML;
    if (seenRowBefore(timestamp, myMsg)) {
      completeReload = false;
      break;
    }
    tmpGuildLog.push([currPage * 100 + i, timestamp, myDate, myMsg,
      rowProfile(myMsg)]);
  }
}

function parseTable() {
  var tableList = doc.getElementsByClassName('width_full');
  if (tableList.length === 1) {getTableList(tableList);}
}

function processPage(data) {
  parsePage(data);
  parseTable();
}

function getOtherPages() {
  var prm = [];
  if (completeReload) {
    for (var i = 2; i <= maxPage; i += 1) {
      prm.push(getGuildLogPage(i).done(processPage));
    }
  } else {
    options.log.forEach(function(e) {
      tmpGuildLog.push([0, e[0], e[1], e[2], e[3]]);
    });
  }
  return $.when.apply($, prm);
}

function storeOptions() {
  setForage('fsh_guildLog', options);
}

function updateOptionsLog() {
  // Don't cache current minute as it may be incomplete
  var nowUtc = (new Date()).setSeconds(0, 0);
  options.log = tmpGuildLog.reduce(function(prev, curr) {
    if (curr[1] !== nowUtc) {
      prev.push([curr[1], curr[2], curr[3], curr[4]]);
    }
    return prev;
  }, []);
  storeOptions();
}

function makeCell(row, html) {
  var thisCell = row.insertCell(-1);
  thisCell.innerHTML = html;
  thisCell.className = 'row';
}

function dataRow(r) {
  var myRow = myTable.insertRow(-1);
  r.push(myRow);
  if (!options.checks[r[4]]) {myRow.className = 'fshHide';}
  makeCell(myRow,
    '<span class="newGuildLog" style="background-image: url(\'' +
    imageServer + '/skin/log_1.gif\');"></span>');
  makeCell(myRow, '<nobr>' + r[2] + '</nobr>');
  makeCell(myRow, r[3]);
}

function separatorRow(r) {
  var sepRow = myTable.insertRow(-1);
  r.push(sepRow);
  if (!options.checks[r[4]]) {sepRow.className = 'fshHide';}
  var sep = sepRow.insertCell(-1);
  sep.className = 'divider';
  sep.colSpan = 3;
}

function buildRow(r) {
  dataRow(r);
  separatorRow(r);
}

function buildTable() {
  myTable = createTable({id: 'fshInjectHere', className: 'width_full'});
  insertHtmlBeforeEnd(myTable, headerRow);

  tmpGuildLog.forEach(buildRow);

  var injector = getElementById('fshInjectHere');
  pCC.replaceChild(myTable, injector);
  addLogColoring('myGuildLog', 1);
  addGuildLogWidgets();
}

function setChecks() {
  Array.prototype.forEach.call(
    getElementsByTagName('input', fshNewGuildLog),
    function(el) {
      el.checked = options.checks[el.getAttribute('item')];
    }
  );
  storeOptions();
}

function gotOtherPages() {
  if (completeReload) {
    tmpGuildLog.sort(function(a, b) {
      return a[0] - b[0];
    });
  }
  fshOutput.textContent = 'Loading complete.';
  updateOptionsLog();
  buildTable();
}

function processFirstPage(data) {
  processPage(data);
  getOtherPages().done(gotOtherPages);
}

function toggleItem(self) {
  var item = Number(self.getAttribute('item'));
  options.checks[item] = !options.checks[item];
  storeOptions();
  var hide = !options.checks[item];
  tmpGuildLog.forEach(function(r) {
    if (r[4] !== item) {return;}
    toggleForce(r[5], hide);
    toggleForce(r[6], hide);
  });
}

function removeHide(el) {
  if (el && el.classList) {el.classList.remove('fshHide');}
}

function selectAll() {
  options.checks = defChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    removeHide(r[5]);
    removeHide(r[6]);
  });
}

function selectNone() {
  options.checks = noChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    hideElement(r[5]);
    hideElement(r[6]);
  });
}

function refresh() {
  options.log = false;
  storeOptions();
  fshOutput.textContent = 'Loading Page 1 ...';
  tmpGuildLog = [];
  completeReload = true;
  getElementById('fshInjectHere').innerHTML = '';
  getGuildLogPage(1).done(processFirstPage);
}

var guildLogEvents = [
  [function(self) {return self.tagName === 'INPUT';}, toggleItem],
  [function(self) {return self.id === 'fshAll';}, selectAll],
  [function(self) {return self.id === 'fshNone';}, selectNone],
  [function(self) {return self.id === 'rfsh';}, refresh]
];

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
  pCC.innerHTML = guildLogFilter;
  getElements();
  on(fshNewGuildLog, 'click', eventHandler5(guildLogEvents));
  setChecks();
  setMaxPage();
  getGuildLogPage(1).done(processFirstPage);
}

export default function injectNewGuildLog() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  getForage('fsh_guildLog').done(gotOptions);
}
