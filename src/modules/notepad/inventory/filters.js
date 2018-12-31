import intValue from '../../system/intValue';
import {options} from './options';
import {itemLvlTest, lvlTest} from '../../common/lvlTests';

function doLvlFilter(_settings, data) {
  return lvlTest(itemLvlTest, intValue(data[1]),
    options.fshMinLvl, options.fshMaxLvl);
}

export function lvlFilter() { // jQuery
  /* Custom filtering function which will search
  data in column 2 between two values */
  $.fn.dataTable.ext.search.push(doLvlFilter);
}

export function typeFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !options.checkedElements ||
        options.checkedElements[data.type];
    }
  );
}

function testSetId(data) {
  return options.checkedElements['-1'] &&
    data.stats && data.stats.set_id !== -1;
}

export function setFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !options.checkedElements ||
        !options.checkedElements['-1'] ||
        testSetId(data);
    }
  );
}

export function rarityFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      var rarity = (parseInt(data.rarity, 10) + 100).toString();
      return !options.checkedElements ||
        options.checkedElements[rarity];
    }
  );
}
