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

//#if _DEV  //  specFilter
function specFilter(settings, searchData, index, rowData) {
  const test = rowData[4].match(/_(\d)\./);
  if (test) {return Number(test[1]) === 0;}
  return true;
}

//#endif
export default function doLvlFilter() {
  $.fn.dataTable.ext.search.push(lvlFilter);
  //#if _DEV  //  specFilter
  $.fn.dataTable.ext.search.push(specFilter);
  //#endif
}
