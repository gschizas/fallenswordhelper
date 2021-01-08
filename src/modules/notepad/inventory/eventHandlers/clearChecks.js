import entries from '../../../common/entries';
import { options } from '../options';
import setChecks from '../setChecks';

function gearOnly(pair) { return Number(pair[0]) >= 100; }

function hydrate(acc, curr) {
  // eslint-disable-next-line prefer-destructuring
  acc[curr[0]] = curr[1];
  return acc;
}

function clearGearOnly(checkedElements) {
  return entries(checkedElements).filter(gearOnly).reduce(hydrate, {});
}

export default function clearChecks(fshInv) { // jQuery
  options.checkedElements = clearGearOnly(options.checkedElements);
  setChecks();
  $(fshInv).DataTable().draw();
}
