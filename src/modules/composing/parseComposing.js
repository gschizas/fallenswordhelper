import calf from '../support/calf';
import setValue from '../system/setValue';
import {
  def_lastComposeCheck,
  def_needToCompose,
  now
} from '../support/constants';

var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;

function timeRemaining(times, el) {
  var timeArr = timeRE.exec(el.textContent);
  if (timeArr) {
    var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + Number(timeArr[3])) *
      1000 + now;
    return times.concat(milli);
  }
  return times.concat(0);
}

function setNeed(bool) {
  setValue(def_needToCompose, bool);
}

export default function parseComposing() {
  if (!calf.enableComposingAlert) {return;}
  var openSlots = document.getElementsByClassName('composing-potion-time');
  var times = Array.from(openSlots).reduce(timeRemaining, []);
  var eta = Math.min.apply(null, times);
  if (eta === 0) {
    setNeed(true);
  } else {
    setNeed(false);
    setValue(def_lastComposeCheck, eta);
  }
}
