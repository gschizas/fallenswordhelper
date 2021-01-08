import intValue from '../system/intValue';
import { opts } from './setOpts';
import { lvlTest, playerLvlTest } from '../common/lvlTests';

function hazOpts(_settings, data) {
  const min = opts.minLvl;
  const max = opts.maxLvl;
  const level = intValue(data[7]);
  return lvlTest(playerLvlTest, level, min, max);
}

function lvlFilter(_settings, data) {
  if (opts) { return hazOpts(_settings, data); }
  return true;
}

function specFilter(_settings, _searchData, _index, rowData) {
  const test = 0;
  if (test) {
    return rowData[4]['@data-order'] === '0';
  }
  return true;
}

export default function doLvlFilter() {
  $.fn.dataTable.ext.search.push(lvlFilter);
  // eslint-disable-next-line no-unused-labels, no-labels
  devLbl: { //  specFilter
    $.fn.dataTable.ext.search.push(specFilter);
  }
}
