import * as assets from './assets';
import * as ajax from '../support/ajax';
import * as logs from '../logs';
import * as system from '../support/system';

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
  return $.ajax({
    url: 'index.php',
    data: {cmd: 'guild', subcmd: 'log', page: page},
    datatype: 'html'
  });
}

function rowProfile(data) {
  var rowTypeID = 0;
  // Potion messages
  if (data.indexOf('(Potion)') !== -1) {
    rowTypeID = 1;
  }
  // Store/Recall (showRecallMessages)
  else if (data.indexOf('recalled the item') !== -1 ||
      data.indexOf('took the item') !== -1 ||
      data.indexOf('auto-returned the') !== -1 ||
      data.indexOf('stored the item') !== -1) {
    rowTypeID = 2;
  }
  // Tag/Untag (showTaggingMessages)
  else if (
      data.indexOf('has added flags to') !== -1 ||
      data.indexOf('has removed flags to') !== -1) {
    rowTypeID = 3;
  }
  // Relic messages (showRelicMessages)
  else if (
      data.indexOf('relic. This relic now has an empower level of') !== -1 ||
      / empowered the .+ relic/.test(data) ||
      data.indexOf(
        'relic. The relic empower level has been reset to zero.') !== -1 ||
      data.indexOf('failed to capture the relic') !== -1 ||
      data.indexOf('captured the relic') !== -1 ||
      data.indexOf('captured your relic') !== -1 ||
      data.indexOf('has captured the undefended relic') !== -1 ||
      data.indexOf('attempted to capture your relic') !== -1 ||
      / removed the empowerment from the .+ relic/.test(data)) {
    rowTypeID = 4;
  }
  // Mercenary messages (showMercenaryMessages)
  else if (
      data.indexOf('disbanded a mercenary.') !== -1 ||
      data.indexOf('hired the mercenary') !== -1) {
    rowTypeID = 5;
  }
  // Group Combat messages (showGroupCombatMessages)
  else if (
      data.indexOf('has disbanded one of their groups') !== -1 ||
      /A group from your guild was (.*) in combat./.test(data)) {
    rowTypeID = 6;
  }
  // Donation messages (showDonationMessages)
  else if (
      /deposited ([,0-9]+) FallenSword Points into the guild./.test(data) ||
      /deposited ([,0-9]+) gold into the guild bank/.test(data)) {
    rowTypeID = 7;
  }
  //Ranking messages (showRankingMessages)
  else if (
      data.indexOf('has added a new rank entitled') !== -1 ||
      data.indexOf('has deleted the rank') !== -1 ||
      data.indexOf('has requested to join the guild') !== -1 ||
      data.indexOf('has invited the player') !== -1 ||
      data.indexOf('has officially joined the guild') !== -1 ||
      data.indexOf('has been kicked from the guild by') !== -1 ||
      data.indexOf('has left the guild') !== -1 ||
      data.indexOf('has been assigned the rank') !== -1) {
    rowTypeID = 8;
  }
  //GvG messages (showGvGMessages)
  else if (
      data.indexOf('resulted in a draw. Your GvG rating and ' +
        'Guild RP was unaffected.') !== -1 ||
      /resulted in (.*) with a final score of/.test(data) ||
      data.indexOf('has just initiated a conflict with the guild') !== -1 ||
      data.indexOf('has initiated a conflict with your guild') !== -1 ||
      data.indexOf(
        'is participating in the conflict against the guild') !== -1) {
    rowTypeID = 9;
  }
  // Titan messages (showTitanMessages)
  else if (
      data.indexOf(
        'from your guild\'s contribution to the defeat of the titan') !== -1 ||
      data.indexOf('a 7 day cooldown has been activated on your ' +
        'guild for this titan') !== -1 ||
      data.indexOf('bought the Titan Reward item') !== -1) {
    rowTypeID = 10;
  }
  return rowTypeID;
}

function findPageInput(prev, curr) {
  var output = prev;
  if (!prev && curr.name === 'page') {output = curr;}
  return output;
}

function getPageInput() {
  var inputList = doc.getElementById('pCC')
    .getElementsByClassName('custominput');
  return Array.prototype.reduce.call(inputList, findPageInput, null);
}

function parsePage(data) {
  doc = system.createDocument(data);
  var pageInput = getPageInput();
  currPage = pageInput.value * 1;
  lastPage = /\d+/.exec(pageInput.parentNode.textContent)[0] * 1;
  if (currPage === 1) {maxPage = Math.min(lastPage, maxPagesToFetch);}
  fshOutput.textContent = 'Loading ' + currPage + ' of ' + maxPage + '...';
}

function parseTable() {
  var tableList = doc.getElementsByClassName('width_full');
  if (tableList.length !== 1) {return;}
  var theTable = tableList[0];
  var limit = theTable.rows.length - 1;
  for (var i = 1; i < limit; i += 2) {
    var myRow = theTable.rows[i];
    var myDate = myRow.cells[1].textContent;
    var timestamp = system.parseDateAsTimestamp(myDate);
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
  ajax.setForage('fsh_guildLog', options);
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
  myTable = document.createElement('table');
  myTable.id = 'fshInjectHere';
  myTable.className = 'width_full';
  myTable.insertAdjacentHTML('beforeend', assets.headerRow);

  tmpGuildLog.forEach(function(r) {
    var myRow = myTable.insertRow(-1);
    r.push(myRow);
    if (!options.checks[r[4]]) {myRow.className = 'fshHide';}
    myRow.insertCell(-1).innerHTML =
      '<span class="newGuildLog" style="background-image: url(\'' +
      system.imageServer + '/skin/log_1.gif\');"></span>';
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

  var pCC = document.getElementById('pCC');
  var injector = document.getElementById('fshInjectHere');
  pCC.replaceChild(myTable, injector);
  logs.addLogColoring('myGuildLog', 1);
  logs.addGuildLogWidgets();
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
  var item = self.getAttribute('item') * 1;
  options.checks[item] = !options.checks[item];
  storeOptions();
  tmpGuildLog.forEach(function(r) {
    if (r[4] !== item) {return;}
    r[5].classList.toggle('fshHide');
    r[6].classList.toggle('fshHide');
  });
}

function selectAll() {
  options.checks = assets.defChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    // if (r[4] === 0) {return;}
    r[5].classList.remove('fshHide');
    r[6].classList.remove('fshHide');
  });
}

function selectNone() {
  options.checks = assets.noChecks.slice(0);
  setChecks();
  tmpGuildLog.forEach(function(r) {
    // if (r[4] === 0) {return;}
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
  document.getElementById('fshInjectHere').innerHTML = '';
  getGuildLogPage(1).done(processFirstPage);
}

function eventHandler(evt) {
  var self = evt.target;
  if (self.tagName === 'INPUT') {toggleItem(self);}
  if (self.id === 'fshAll') {selectAll();}
  if (self.id === 'fshNone') {selectNone();}
  if (self.id === 'rfsh') {refresh();}
}

function gotOptions(guildLog) {
  options = guildLog || options;
  options.checks = options.checks || assets.defChecks.slice(0);
  document.getElementById('pCC').innerHTML = assets.guildLogFilter;
  fshNewGuildLog = document.getElementById('fshNewGuildLog');
  fshNewGuildLog.addEventListener('click', eventHandler);
  setChecks();
  fshOutput = document.getElementById('fshOutput');
  maxPagesToFetch = system.getValue('newGuildLogHistoryPages') * 1;
  maxPage = maxPagesToFetch;
  getGuildLogPage(1).done(processFirstPage);
}

export function injectNewGuildLog() {
  ajax.getForage('fsh_guildLog').done(gotOptions);
}
