import addGuildLogWidgets from '../logs/addGuildLogWidgets';
import addLogColoring from '../logs/addLogColoring';
import {createTable} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getForage from '../ajax/getForage';
import {pCC} from '../support/layout';
import retryAjax from '../ajax/retryAjax';
import {rowProfile} from './profiler';
import setForage from '../ajax/setForage';
import {
  createDocument,
  getValue,
  imageServer,
  parseDateAsTimestamp
} from '../support/system';
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

function getGuildLogPage(page) {
  return retryAjax({
    url: 'index.php',
    data: {cmd: 'guild', subcmd: 'log', page: page},
    datatype: 'html'
  });
}

function findPageInput(prev, curr) {
  var output = prev;
  if (!prev && curr.name === 'page') {output = curr;}
  return output;
}

function getPageInput() {
  var inputList = getElementById('pCC', doc)
    .getElementsByClassName('custominput');
  return Array.prototype.reduce.call(inputList, findPageInput, null);
}

function parsePage(data) {
  doc = createDocument(data);
  var pageInput = getPageInput();
  currPage = Number(pageInput.value);
  lastPage = Number(/\d+/.exec(pageInput.parentNode.textContent)[0]);
  if (currPage === 1) {maxPage = Math.min(lastPage, maxPagesToFetch);}
  fshOutput.textContent = 'Loading ' + currPage + ' of ' + maxPage + '...';
}

function getTableList(tableList) {
  var theTable = tableList[0];
  var limit = theTable.rows.length - 1;
  for (var i = 1; i < limit; i += 2) {
    var myRow = theTable.rows[i];
    var myDate = myRow.cells[1].textContent;
    var timestamp = parseDateAsTimestamp(myDate);
    var myMsg = myRow.cells[2].innerHTML;
    if (currPage === 1 &&
        options.log &&
        timestamp === options.log[0][0] &&
        myMsg === options.log[0][2]) {
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

function buildTable() {
  myTable = createTable({id: 'fshInjectHere', className: 'width_full'});
  myTable.insertAdjacentHTML('beforeend', headerRow);

  tmpGuildLog.forEach(function(r) {
    var myRow = myTable.insertRow(-1);
    r.push(myRow);
    if (!options.checks[r[4]]) {myRow.className = 'fshHide';}
    myRow.insertCell(-1).innerHTML =
      '<span class="newGuildLog" style="background-image: url(\'' +
      imageServer + '/skin/log_1.gif\');"></span>';
    myRow.cells[0].className = 'row';
    myRow.insertCell(-1).innerHTML = '<nobr>' + r[2] + '</nobr>';
    myRow.cells[1].className = 'row';
    myRow.insertCell(-1).innerHTML = r[3];
    myRow.cells[2].className = 'row';
    var sepRow = myTable.insertRow(-1);
    r.push(sepRow);
    if (!options.checks[r[4]]) {sepRow.className = 'fshHide';}
    var sep = sepRow.insertCell(-1);
    sep.className = 'divider';
    sep.colSpan = 3;
  });

  var injector = getElementById('fshInjectHere');
  pCC.replaceChild(myTable, injector);
  addLogColoring('myGuildLog', 1);
  addGuildLogWidgets();
}

function setChecks() {
  Array.prototype.forEach.call(
    fshNewGuildLog.getElementsByTagName('input'),
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
  tmpGuildLog.forEach(function(r) {
    if (r[4] !== item) {return;}
    r[5].classList.toggle('fshHide');
    r[6].classList.toggle('fshHide');
  });
}

function selectAll() {
  options.checks = defChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    r[5].classList.remove('fshHide');
    r[6].classList.remove('fshHide');
  });
}

function selectNone() {
  options.checks = noChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    r[5].classList.add('fshHide');
    r[6].classList.add('fshHide');
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
  {test: function(self) {return self.tagName === 'INPUT';}, fn: toggleItem},
  {test: function(self) {return self.id === 'fshAll';}, fn: selectAll},
  {test: function(self) {return self.id === 'fshNone';}, fn: selectNone},
  {test: function(self) {return self.id === 'rfsh';}, fn: refresh}
];

function eventHandler(evt) {
  var self = evt.target;
  for (var i = 0; i < guildLogEvents.length; i += 1) {
    if (guildLogEvents[i].test(self)) {guildLogEvents[i].fn(self);}
  }
}

function gotOptions(guildLog) {
  options = guildLog || options;
  options.checks = options.checks || defChecks.slice(0);
  pCC.innerHTML = guildLogFilter;
  fshNewGuildLog = getElementById('fshNewGuildLog');
  fshNewGuildLog.addEventListener('click', eventHandler);
  setChecks();
  fshOutput = getElementById('fshOutput');
  maxPagesToFetch = Number(getValue('newGuildLogHistoryPages'));
  maxPage = maxPagesToFetch;
  getGuildLogPage(1).done(processFirstPage);
}

export default function injectNewGuildLog() {
  getForage('fsh_guildLog').done(gotOptions);
}
