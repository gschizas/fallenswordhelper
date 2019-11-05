import './newGuildLog5.postcss';
import add from '../../support/task';
import {createTable} from '../../common/cElement';
import {get} from '../../system/idb';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import initTable from './outputTable';
import insertElement from '../../common/insertElement';
// import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../../common/jQueryNotPresent';
import log from '../../app/guild/log';
import {months} from '../../support/constants';
// import on from '../../common/on';
import {pCC} from '../../support/layout';
import padZ from '../../system/padZ';
import partial from '../../common/partial';
import {
  guildLogFilter5,
  headerRow,
} from './assets';

function formatShortDate(unixTime) {
  var aDate = new Date(unixTime * 1000);
  var yyyy = aDate.getUTCFullYear().toString();
  var dd = padZ(aDate.getUTCDate());
  var month = months[aDate.getUTCMonth()];
  var hh = padZ(aDate.getUTCHours());
  var mm = padZ(aDate.getUTCMinutes());
  return hh + ':' + mm + ' ' + dd + '/' + month + '/' + yyyy;
}

function isOldRow(postAgeMins, postDateUtc, lastCheckUtc) {
  return postAgeMins > 20 && postDateUtc <= lastCheckUtc;
}

function trClass(nowUtc, lastCheckUtc, el) {
  var ret = '';
  var postAgeMins = (nowUtc - el.time) / (1000 * 60);
  if (el.time > lastCheckUtc) {
    ret = ' class="fshNr"';
  } else if (isOldRow(postAgeMins, el.time, lastCheckUtc)) {
    ret = ' class="fshOr"';
  }
  return ret;
}

function toTr(nowUtc, lastCheckUtc, el) {
  return '<tr' + trClass(nowUtc, lastCheckUtc, el) +
    '><td><span class="newGuildLog"></span></td><td>' +
    formatShortDate(el.time) + '</td><td>' +
    el.msg.text + '</td></tr>';
}

function getGuildLog(tofetch, myId, myLog, latest) {
  return log(myId, latest, tofetch).then(function(json) {
    var someLog = json.r.logs;
    var newLog = someLog.concat(myLog);
    var noOfRecords = someLog.length;
    if (noOfRecords === 1000) {
      return getGuildLog(tofetch - noOfRecords, someLog[0].id, newLog, false);
    }
    return newLog;
  });
}

function processRawLog(theLog) {
  var nowUtc = (new Date()).setUTCSeconds(0, 0) - 1;
  var lastCheckUtc = getValue('lastmyGuildLogCheck') || nowUtc;
  var foo = theLog.map(partial(toTr, nowUtc, lastCheckUtc)).reverse();
  getElementById('fshOutput').textContent = 'Building table.';
  add(3, initTable, [foo]);
}

function receiveLog(theLog) {
  // console.log('theLog', theLog);
  getElementById('fshOutput').textContent = 'Processing.';
  add(3, processRawLog, [theLog]);
}

function gotOptions(guildLog) { // eslint-disable-line no-unused-vars
  // console.log('guildLog', guildLog);
  var maxPagesToFetch = 100; // Number(getValue('newGuildLogHistoryPages'));
  getGuildLog(maxPagesToFetch * 50, -1, []).then(receiveLog);

  var fshNewGuildLog = createTable({
    className: 'fshInvFilter',
    innerHTML: guildLogFilter5
  });
  insertElement(pCC, fshNewGuildLog);

  var headerTable = createTable({
    className: 'width_full',
    id: 'headerTable5',
    innerHTML: headerRow
  });
  insertElement(pCC, headerTable);
}

export default function newGuildLog5() { // jQuery.min
  if (jQueryNotPresent()) {return;}
  get('fsh_guildLog').then(gotOptions);
}
