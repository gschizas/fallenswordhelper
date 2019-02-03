import {options} from '../options';
import setChecks from '../setChecks';

function gearOnly(pair) {return Number(pair[0]) >= 100;}

function hydrate(prev, curr) {
  prev[curr[0]] = curr[1];
  return prev;
}

function clearGearOnly(checkedElements) {
  return Object.entries(checkedElements).filter(gearOnly).reduce(hydrate, {});
}

export default function clearChecks(fshInv) { // jQuery
  options.checkedElements = clearGearOnly(options.checkedElements);
  setChecks();
  $(fshInv).DataTable().draw();
}
