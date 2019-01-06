import intValue from '../system/intValue';
import {opts} from './setOpts';
import {lvlTest, playerLvlTest} from '../common/lvlTests';

function hazOpts(_settings, data) {
  var min = opts.minLvl;
  var max = opts.maxLvl;
  var level = intValue(data[7]);
  return lvlTest(playerLvlTest, level, min, max);
}

function lvlFilter(_settings, data) {
  if (opts) {return hazOpts(_settings, data);}
  return true;
}

export default function doLvlFilter() {
  $.fn.dataTable.ext.search.push(lvlFilter);
}
