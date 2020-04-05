import calf from '../support/calf';
import getArrayByClassName from '../common/getArrayByClassName';
import getText from '../common/getText';
import { now } from '../support/now';
import setValue from '../system/setValue';
import {
  def_lastComposeCheck,
  def_needToCompose,
} from '../support/constants';

const timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;

function timeRemaining(times, el) {
  const timeArr = timeRE.exec(getText(el));
  if (timeArr) {
    const milli = (timeArr[1] * 3600 + timeArr[2] * 60 + Number(timeArr[3]))
      * 1000 + now;
    return times.concat(milli);
  }
  return times.concat(0);
}

function setNeed(bool) {
  setValue(def_needToCompose, bool);
}

export default function parseComposing() {
  if (!calf.enableComposingAlert) { return; }
  const openSlots = getArrayByClassName('composing-potion-time', document);
  const times = openSlots.reduce(timeRemaining, []);
  const eta = Math.min.apply(null, times);
  if (eta === 0) {
    setNeed(true);
  } else {
    setNeed(false);
    setValue(def_lastComposeCheck, eta);
  }
}
