import {defaultOptions} from '../assets';
import {options} from '../inventory';
import setChecks from '../setChecks';

export default function resetChecks() { // jQuery
  options.checkedElements = defaultOptions.checkedElements;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}
