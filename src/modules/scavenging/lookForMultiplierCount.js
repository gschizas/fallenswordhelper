import {closestTable} from '../common/closest';
import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getText from '../common/getText';
import insertElement from '../common/insertElement';
import intValue from '../system/intValue';
import on from '../common/on';
import partial from '../common/partial';

function clearWidth(multCnt) {
  var parentTable = closestTable(multCnt);
  parentTable.removeAttribute('width');
}

function makeMaxTimes(multCnt) {
  var maxTimes = createSpan();
  insertElement(multCnt.parentNode, maxTimes);
  return maxTimes;
}

function updateMaxTimes(maxTimes, statbarGold, scoutGold) {
  var myGold = intValue(getText(statbarGold));
  var times = Math.floor(myGold / scoutGold).toString();
  maxTimes.innerHTML = '&nbsp;&nbsp;Max: ' + times + ' times';
}

function redrawMaxTimes(maxTimes, statbarGold, gold) {
  maxTimes.innerHTML = '';
  var scoutGold = Number(gold.value);
  if (!isNaN(scoutGold) && scoutGold !== 0) {
    updateMaxTimes(maxTimes, statbarGold, scoutGold);
  }
}

function setMaxTimes(maxTimes, statbarGold, gold) {
  if (maxTimes) {
    redrawMaxTimes(maxTimes, statbarGold, gold);
  }
}

function initMaxTimes(maxTimes, statbarGold, gold) {
  var boundSet = partial(setMaxTimes, maxTimes, statbarGold, gold);
  boundSet();
  on(gold, 'keyup', boundSet);
}

function foundMultiplierCount(multCnt) {
  clearWidth(multCnt);
  initMaxTimes(makeMaxTimes(multCnt), getElementById('statbar-gold'),
    getElementById('gold'));
}

export default function lookForMultiplierCount() {
  var multCnt = getElementById('multiplier_count');
  if (multCnt) {foundMultiplierCount(multCnt);}
}
