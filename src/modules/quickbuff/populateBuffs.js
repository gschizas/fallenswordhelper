import fallback from '../system/fallback';
import {getElementById} from '../common/getElement';

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

function getBuff(doc, buff, inject) {
  var s = fallback(doc[buff], 0);
  if (s) {
    var buffTimeToExpire = buffTimeLeft(s);
    inject.innerHTML = '<span class="fshLime">On</span>&nbsp;<span ' +
      'class="fshBuffOn">(' + buffTimeToExpire + ')</span>';
  } else {
    var elem = document.querySelector('#buff-outer input[data-name="' +
      buff + '"]');
    if (elem) {
      inject.innerHTML = '<span class="quickbuffActivate" data-buffid="' +
        elem.value + '">Activate</span>';
    } else {
      inject.innerHTML = '<span class="fshRed;">Off</span>';
    }
  }
}

export default function populateBuffs(responseText) {
  var skl = responseText._skills.reduce(function(prev, curr) {
    prev[curr.name] = curr.duration;
    return prev;
  }, {});
  getBuff(skl, 'Guild Buffer', getElementById('fshGB'));
  getBuff(skl, 'Buff Master', getElementById('fshBM'));
  getBuff(skl, 'Extend', getElementById('fshExt'));
  getBuff(skl, 'Reinforce', getElementById('fshRI'));
}
