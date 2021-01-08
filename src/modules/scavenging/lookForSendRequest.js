import alpha from '../common/alpha';
import createDiv from '../common/cElement/createDiv';
import entries from '../common/entries';
import getElementById from '../common/getElement';
import insertElement from '../common/insertElement';
import isFunction from '../common/isFunction';
import { pCC } from '../support/layout';
import setInnerHtml from '../dom/setInnerHtml';
import setLastScav from './setLastScav';

/* global sendRequest:true */

let fshSummary;

function getSummary() {
  if (!fshSummary) {
    fshSummary = createDiv();
    insertElement(pCC, fshSummary);
  }
  setInnerHtml('', fshSummary);
  return fshSummary;
}

function getVictories(report) {
  const victories = report.match(/victorious/g);
  if (victories) {
    return `Victories: ${victories.length}`;
  }
  return '';
}

function getDefeats(report) {
  const defeats = report.match(/defeated/g);
  if (defeats) {
    return `, Defeated: ${defeats.length}`;
  }
  return '';
}

function makeHash(acc, curr) {
  const itemName = curr.match(/>([^<]+)</)[1];
  acc[itemName] = (acc[itemName] || 0) + 1;
  return acc;
}

function buildGainHash(gains) {
  return gains.reduce(makeHash, {});
}

function alphaEntries(a, b) { return alpha(a[0], b[0]); }

function summary(pair) { return `<br>${pair[1]} ${pair[0]}(s), `; }

function gotGains(gains) {
  const gainHash = buildGainHash(gains);
  return `<br>${gains.length} item(s):${
    entries(gainHash).sort(alphaEntries).map(summary).join('')}`;
}

function getGains(report) {
  const gains = report.match(/Item Gained: <b>[^<]+<\/b>/g);
  if (gains) { return gotGains(gains); }
}

function multiScav() {
  let ret = '';
  const scavRes = getElementById('scavenge_results');
  if (scavRes) {
    const report = scavRes.innerHTML;
    ret += getVictories(report);
    ret += getDefeats(report);
    ret += getGains(report);
  }
  return ret;
}

function interceptSendRequest(oldSendRequest) {
  return function b(amount, goldValue, caveValue) {
    oldSendRequest(amount, goldValue, caveValue);
    setLastScav(caveValue, goldValue);
    setInnerHtml(multiScav(), getSummary());
  };
}

export default function lookForSendRequest() {
  const oldSendRequest = sendRequest;
  if (isFunction(oldSendRequest)) {
    sendRequest = interceptSendRequest(oldSendRequest);
  }
}
