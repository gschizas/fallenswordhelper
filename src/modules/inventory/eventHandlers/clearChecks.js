import {options} from '../inventory';
import setChecks from '../setChecks';

function clearGearOnly(checkedElements) {
  var newEle = {};
  Object.keys(checkedElements).forEach(function(key) {
    if (parseInt(key, 10) >= 100) {
      newEle[key] = checkedElements[key];
    }
  });
  return newEle;
}

export default function clearChecks() { // jQuery
  options.checkedElements = clearGearOnly(options.checkedElements);
  setChecks();
  $('#fshInv').DataTable().draw();
}
