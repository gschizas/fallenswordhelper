import alpha from '../common/alpha';
import {createDiv} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import isFunction from '../common/isFunction';
import {pCC} from '../support/layout';
import setLastScav from './setLastScav';

/* global sendRequest:true */

var fshSummary;

function getSummary() {
  if (!fshSummary) {
    fshSummary = createDiv();
    insertElement(pCC, fshSummary);
  }
  fshSummary.innerHTML = '';
  return fshSummary;
}

function getVictories(report) {
  var victories = report.match(/victorious/g);
  if (victories) {
    return 'Victories: ' + victories.length;
  }
  return '';
}

function getDefeats(report) {
  var defeats = report.match(/defeated/g);
  if (defeats) {
    return ', Defeated: ' + defeats.length;
  }
  return '';
}

function makeHash(prev, curr) {
  var itemName = curr.match(/>([^<]+)</)[1];
  prev[itemName] = (prev[itemName] || 0) + 1;
  return prev;
}

function buildGainHash(gains) {
  return gains.reduce(makeHash, {});
}

function alphaEntries(a, b) {return alpha(a[0], b[0]);}

function summary(pair) {return '<br>' + pair[1] + ' ' + pair[0] + '(s), ';}

function gotGains(gains) {
  var gainHash = buildGainHash(gains);
  return '<br>' + gains.length + ' item(s):' +
    Object.entries(gainHash).sort(alphaEntries).map(summary).join('');
}

function getGains(report) {
  var gains = report.match(/Item Gained: <b>[^<]+<\/b>/g);
  if (gains) {return gotGains(gains);}
}

function multiScav() {
  var ret = '';
  var scavRes = getElementById('scavenge_results');
  if (scavRes) {
    var report = scavRes.innerHTML;
    ret += getVictories(report);
    ret += getDefeats(report);
    ret += getGains(report);
  }
  return ret;
}

function interceptSendRequest(oldSendRequest) {
  return function(amount, goldValue, caveValue) {
    oldSendRequest(amount, goldValue, caveValue);
    setLastScav(caveValue, goldValue);
    getSummary().innerHTML = multiScav();
  };
}

export default function lookForSendRequest() {
  var oldSendRequest = sendRequest;
  if (isFunction(oldSendRequest)) {
    sendRequest = interceptSendRequest(oldSendRequest);
  }
}
