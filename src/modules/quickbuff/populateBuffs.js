import {getElementById} from '../common/getElement';
import querySelector from '../common/querySelector';

function timeUnit(value, unit) {
  if (value > 0) {return value.toString() + unit;}
  return '';
}

function buffTimeLeft(_s) {
  var m = Math.floor(_s / 60);
  var s = _s % 60;
  var buffTimeToExpire = timeUnit(m, 'm');
  if (m > 0 && s > 0) {buffTimeToExpire += ' ';}
  buffTimeToExpire += timeUnit(s, 's');
  return buffTimeToExpire;
}

function timeToExpire(s) {
  var buffTimeToExpire = buffTimeLeft(s);
  return '<span class="fshLime">On</span>&nbsp;<span class="fshBuffOn">(' +
    buffTimeToExpire + ')</span>';
}

function isAvailable(buff) {
  var elem = querySelector('#buff-outer input[data-name="' + buff + '"]');
  if (elem) {
    return '<span class="quickbuffActivate" data-buffid="' + elem.value +
      '">Activate</span>';
  }
  return '<span class="fshRed;">Off</span>';
}

function buffRunning(dict, buff) {
  var s = dict[buff] || 0;
  if (s) {return timeToExpire(s);}
  return isAvailable(buff);
}

function getBuff(dict, buff, inject) {
  inject.innerHTML = buffRunning(dict, buff);
}

function makeDictionary(prev, curr) {
  prev[curr.name] = curr.duration;
  return prev;
}

export default function populateBuffs(responseText) {
  var skl = responseText._skills.reduce(makeDictionary, {});
  getBuff(skl, 'Guild Buffer', getElementById('fshGB'));
  getBuff(skl, 'Buff Master', getElementById('fshBM'));
  getBuff(skl, 'Extend', getElementById('fshExt'));
  getBuff(skl, 'Reinforce', getElementById('fshRI'));
}
