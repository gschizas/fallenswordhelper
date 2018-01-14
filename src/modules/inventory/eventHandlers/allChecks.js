import {inventoryCheckAll} from '../assets';
import {options} from '../inventory';
import setChecks from '../setChecks';

export default function allChecks() { // jQuery
  options.checkedElements = inventoryCheckAll;
  setChecks();
  $('#fshInv').DataTable().draw(false);
}
