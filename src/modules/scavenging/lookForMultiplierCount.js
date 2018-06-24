import {createSpan} from '../common/cElement';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import intValue from '../system/intValue';

var multCnt;
var maxTimes;
var statbarGold;
var gold;

function setMaxTimes() {
  if (maxTimes) {
    maxTimes.innerHTML = '';
    var scoutGold = Number(gold.value);
    if (scoutGold !== 0) {
      var myGold = intValue(statbarGold.textContent);
      var times = Math.floor(myGold / scoutGold).toString();
      maxTimes.innerHTML = '&nbsp;&nbsp;Max: ' + times + ' times';
    }
  }
}

function foundMultiplierCount() {
  maxTimes = createSpan();
  insertElement(multCnt.parentNode, maxTimes);
  statbarGold = getElementById('statbar-gold');
  gold = getElementById('gold');
  setMaxTimes();
  gold.addEventListener('keyup', setMaxTimes);
}

export default function lookForMultiplierCount() {
  multCnt = getElementById('multiplier_count');
  if (multCnt) {foundMultiplierCount();}
}
