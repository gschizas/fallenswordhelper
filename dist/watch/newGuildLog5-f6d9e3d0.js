import { B as setText, A as getElementById, k as insertHtmlBeforeEnd, u as partial, i as insertElement, p as pCC, l as on, aL as guild, z as jQueryNotPresent, ai as get, aN as padZ, aO as months, G as getValue, a as add } from './calfSystem-69cf053a.js';
import { c as createTable } from './createTable-b43c02b0.js';

let outputTable;

/* function analyseOutput() {
  Array.from(outputTable.rows).forEach(function(el, i) {
    if (i % 2 && el.children.length === 3) {
      console.log(
        i,
        // el.cells[2].textContent,
        el.cells[2].textContent.length,
        el.cells[2].clientHeight
      );
    }
  });
} */

// https://github.com/julienetie/volve
function debounce(callback, delay) {
  let timeoutId;
  return function a() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

function injectTable(myTable) {
  outputTable.replaceChild(myTable.children[0], outputTable.children[0]);
  setText('Complete.', getElementById('fshOutput'));
}

function makeRows(myTable, r) {
  insertHtmlBeforeEnd(myTable.tBodies[0], r);
  const sepRow = myTable.insertRow(-1);
  const sep = sepRow.insertCell(-1);
  sep.className = 'divider';
  sep.colSpan = 3;
}

function drawTable(foo) {
  const rectTop = outputTable.getBoundingClientRect().top;
  const topHeight = Math.abs(Math.min(rectTop, 0));
  const topRows = topHeight / 24;
  const numOfVisibleRows = Math.ceil(document.documentElement.clientHeight / 24);
  const remainingRows = foo.length - topRows - numOfVisibleRows;

  const myTable = createTable({ innerHTML: '<tbody></tbody>' });

  const topSpace = myTable.insertRow(-1);
  topSpace.style.height = `${topHeight.toString()}px`;
  topSpace.insertCell(-1);
  topSpace.insertCell(-1);
  topSpace.insertCell(-1);

  foo.slice(topRows, topRows + numOfVisibleRows - 1)
    .forEach(partial(makeRows, myTable));

  const bottomPadding = myTable.insertRow(-1);
  const remainingHeight = remainingRows * 24;
  bottomPadding.style.height = `${remainingHeight.toString()}px`;

  getElementById('fshOutput').textContent = 'Inject table.';
  // add(3, injectTable, [myTable]);
  requestAnimationFrame(partial(injectTable, myTable));
}

function initTable(foo) {
  outputTable = createTable({
    className: 'width_full',
    id: 'fshInjectHere5',
    innerHTML: '<tbody></tbody>',
  });
  insertElement(pCC, outputTable);
  drawTable(foo);
  on(window, 'scroll', debounce(partial(drawTable, foo), 0));
}

function log(logId, latest, limit) {
  return guild({
    subcmd: 'log',
    log_id: logId,
    latest,
    limit,
  });
}

const guildLogFilter5 = '<thead><tr>'
  // '<table id="fshNewGuildLog" class="fshInvFilter">'
  + '<th colspan="11"><b>Guild Log Version 5</b></th>'
  + '<th colspan="3"><span id="rfsh" class="sendLink">Reset</span> '
  + '<a href="index.php?cmd=guild&subcmd=log" class="sendLink">'
  + 'Old Guild Log</a></th>'
  + '</tr></thead><tbody>'
  + '<tr><td rowspan="3"><b>&nbsp;Filters:</b></td>'
  + '<td class="fshRight">&nbsp;Potions:</td>'
  + '<td><input type="checkbox" data-item="1"/></td>'
  + '<td class="fshRight">&nbsp;Store/Recalls:</td>'
  + '<td><input type="checkbox" data-item="2"/></td>'
  + '<td class="fshRight">&nbsp;Relics:</td>'
  + '<td><input type="checkbox" data-item="4"/></td>'
  + '<td class="fshRight">&nbsp;Mercenaries:</td>'
  + '<td><input type="checkbox" data-item="5"/></td>'
  + '<td class="fshRight">&nbsp;Group Combats:</td>'
  + '<td><input type="checkbox" data-item="6"/></td>'
  + '<td colspan="3">&nbsp;</td>'
  + '</tr><tr>'
  + '<td class="fshRight">&nbsp;Donations:</td>'
  + '<td><input type="checkbox" data-item="7"/></td>'
  + '<td class="fshRight">&nbsp;Rankings:</td>'
  + '<td><input type="checkbox" data-item="8"/></td>'
  + '<td class="fshRight">&nbsp;GvGs:</td>'
  + '<td><input type="checkbox" data-item="9"/></td>'
  + '<td class="fshRight">&nbsp;Tag/UnTags:</td>'
  + '<td><input type="checkbox" data-item="3"/></td>'
  + '<td class="fshRight">&nbsp;Titans:</td>'
  + '<td><input type="checkbox" data-item="10"/></td>'
  + '<td class="fshRight">&nbsp;Other:</td>'
  + '<td><input type="checkbox" data-item="0"/></td>'
  + '<td>&nbsp;</td>'
  + '</tr><tr>'
  + '<td colspan="2">'
  + '&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td>'
  + '<td colspan="2">'
  + '&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td>'
  + '<td colspan="9"></td>'
  + '</tr><tr><td id="fshOutput" class="fshBlue" colspan="14">'
  + 'Loading ...</td></tr>'
  + '</tbody>';
  // '</table>' +
  // '<table id="fshInjectHere5">' +
  // '</table>';
const headerRow = '<tbody><tr>'
  + '<td class="header">&nbsp;</td>'
  + '<td class="header">Date</td>'
  + '<td class="header">Message</td>'
  + '</tr></tbody>';
const msgType = [
  'Unknown', // 0
  'Potion', // 1
  'showRecallMessages', // 2
  'showTaggingMessages', // 3
  'showRelicMessages', // 4
  'showMercenaryMessages', // 5
  'showGroupCombatMessages', // 6
  'showDonationMessages', // 7
  'showRankingMessages', // 8
  'showGvGMessages', // 9
  'showTitanMessages', // 10
];
const defChecks = [true, true, true, true, true, true,
  true, true, true, true, true];
const noChecks = [false, false, false, false, false, false,
  false, false, false, false, false];

function formatShortDate(unixTime) {
  const aDate = new Date(unixTime * 1000);
  const yyyy = aDate.getUTCFullYear().toString();
  const dd = padZ(aDate.getUTCDate());
  const month = months[aDate.getUTCMonth()];
  const hh = padZ(aDate.getUTCHours());
  const mm = padZ(aDate.getUTCMinutes());
  return `${hh}:${mm} ${dd}/${month}/${yyyy}`;
}

function isOldRow(postAgeMins, postDateUtc, lastCheckUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function trClass(nowUtc, lastCheckUtc, el) {
  let ret = '';
  const postAgeMins = (nowUtc - el.time) / (1000 * 60);
  if (el.time > lastCheckUtc) {
    ret = ' class="fshNr"';
  } else if (isOldRow(postAgeMins, el.time, lastCheckUtc)) {
    ret = ' class="fshOr"';
  }
  return ret;
}

function toTr(nowUtc, lastCheckUtc, el) {
  return `<tr${trClass(nowUtc, lastCheckUtc, el)
  }><td><span class="newGuildLog"></span></td><td>${
    formatShortDate(el.time)}</td><td>${
    el.msg.text}</td></tr>`;
}

function getGuildLog(tofetch, myId, myLog, latest) {
  return log(myId, latest, tofetch).then((json) => {
    const someLog = json.r.logs;
    const newLog = someLog.concat(myLog);
    const noOfRecords = someLog.length;
    if (noOfRecords === 1000) {
      return getGuildLog(tofetch - noOfRecords, someLog[0].id, newLog, false);
    }
    return newLog;
  });
}

function processRawLog(theLog) {
  const nowUtc = new Date().setUTCSeconds(0, 0) - 1;
  const lastCheckUtc = getValue('lastmyGuildLogCheck') || nowUtc;
  const foo = theLog.map(partial(toTr, nowUtc, lastCheckUtc)).reverse();
  setText('Building table.', getElementById('fshOutput'));
  add(3, initTable, [foo]);
}

function receiveLog(theLog) {
  // console.log('theLog', theLog);
  setText('Processing.', getElementById('fshOutput'));
  add(3, processRawLog, [theLog]);
}

// eslint-disable-next-line no-unused-vars
function gotOptions(guildLog) {
  // console.log('guildLog', guildLog);
  const maxPagesToFetch = 100; // Number(getValue('newGuildLogHistoryPages'));
  getGuildLog(maxPagesToFetch * 50, -1, []).then(receiveLog);

  const fshNewGuildLog = createTable({
    className: 'fshInvFilter',
    innerHTML: guildLogFilter5,
  });
  insertElement(pCC, fshNewGuildLog);

  const headerTable = createTable({
    className: 'width_full',
    id: 'headerTable5',
    innerHTML: headerRow,
  });
  insertElement(pCC, headerTable);
}

function newGuildLog5() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  get('fsh_guildLog').then(gotOptions);
}

export default newGuildLog5;
//# sourceMappingURL=newGuildLog5-f6d9e3d0.js.map
