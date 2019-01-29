import {closestTable} from '../common/closest';
import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import getText from '../common/getText';
import insertElement from '../common/insertElement';
import intValue from '../system/intValue';
import on from '../common/on';
import partial from '../common/partial';

function setMaxTimes(maxTimes, statbarGold, gold) {
  if (maxTimes) {
    maxTimes.innerHTML = '';
    var scoutGold = Number(gold.value);
    if (scoutGold !== 0) {
      var myGold = intValue(getText(statbarGold));
      var times = Math.floor(myGold / scoutGold).toString();
      maxTimes.innerHTML = '&nbsp;&nbsp;Max: ' + times + ' times';
    }
  }
}

function foundMultiplierCount(multCnt) {
  var parentTable = closestTable(multCnt);
  parentTable.removeAttribute('width');
  var maxTimes = createSpan();
  insertElement(multCnt.parentNode, maxTimes);
  var statbarGold = getElementById('statbar-gold');
  var gold = getElementById('gold');
  var boundSet = partial(setMaxTimes, maxTimes, statbarGold, gold);
  boundSet();
  on(gold, 'keyup', boundSet);
}

export default function lookForMultiplierCount() {
  var multCnt = getElementById('multiplier_count');
  if (multCnt) {foundMultiplierCount(multCnt);}
}
