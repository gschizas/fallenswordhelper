import {defaultOptions} from '../assets';
import {options} from '../options';
import setChecks from '../setChecks';

export default function resetChecks(fshInv) { // jQuery
  options.checkedElements = defaultOptions.checkedElements;
  setChecks();
  $(fshInv).DataTable().draw(false);
}
