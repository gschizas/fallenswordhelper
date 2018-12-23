import intValue from '../system/intValue';
import {opts} from './setOpts';

var lvlTests = [
  function(min) {return !min;},
  function(min, max) {return !max;},
  function(min, max) {return isNaN(min) && isNaN(max);},
  function(min, max, level) {return isNaN(min) && level <= max;},
  function(min, max, level) {return min <= level && isNaN(max);},
  function(min, max, level) {return min <= level && level <= max;}
];

function hazOpts(_settings, data) {
  var min = opts.minLvl;
  var max = opts.maxLvl;
  var level = intValue(data[7]);
  return lvlTests.some(function(fn) {return fn(min, max, level);});
}

function lvlFilter(_settings, data) {
  if (opts) {return hazOpts(_settings, data);}
  return true;
}

export default function doLvlFilter() {
  $.fn.dataTable.ext.search.push(lvlFilter);
}
