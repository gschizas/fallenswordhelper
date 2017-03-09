import * as inventory from './inventory';
import * as system from '../support/system';

export function lvlFilter() { // jQuery
  /* Custom filtering function which will search
  data in column 2 between two values */
  $.fn.dataTable.ext.search.push(
    function(_settings, data) {
      var min = inventory.options.fshMinLvl;
      var max = inventory.options.fshMaxLvl;
      var level = system.intValue(data[1]); // use data for the level column
      if (level === 0 ||
        isNaN(min) && isNaN(max) ||
        isNaN(min) && level <= max ||
        min <= level && isNaN(max) ||
        min <= level && level <= max) {return true;}
      return false;
    }
  );
}

export function typeFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !inventory.options.checkedElements ||
        inventory.options.checkedElements[data.type];
    }
  );
}

export function setFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      return !inventory.options.checkedElements ||
        !inventory.options.checkedElements['-1'] ||
        inventory.options.checkedElements['-1'] &&
        data.stats &&
        data.stats.set_id !== '-1';
    }
  );
}

export function rarityFilter() { // jQuery
  $.fn.dataTable.ext.search.push(
    function(_settings, _row, _index, data) {
      var rarity = (parseInt(data.rarity, 10) + 100).toString();
      return !inventory.options.checkedElements ||
        inventory.options.checkedElements[rarity];
    }
  );
}
