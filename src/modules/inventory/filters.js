import {intValue} from '../system/system';
import {options} from './inventory';

var lvlTests = [
  function(level) {return level === 0;},
  function(level, min, max) {return isNaN(min) && isNaN(max);},
  function(level, min, max) {return isNaN(min) && level <= max;},
  function(level, min, max) {return min <= level && isNaN(max);},
  function(level, min, max) {return min <= level && level <= max;}
];

function doLvlFilter(_settings, data) {
  var min = options.fshMinLvl;
  var max = options.fshMaxLvl;
  var level = intValue(data[1]); // use data for the level column
  for (var i = 0; i < lvlTests.length; i += 1) {
    if (lvlTests[i](level, min, max)) {return true;}
  }
  return false;
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
    data.stats && data.stats.set_id !== '-1';
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
