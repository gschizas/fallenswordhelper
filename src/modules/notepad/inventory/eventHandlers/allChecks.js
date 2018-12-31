import {inventoryCheckAll} from '../assets';
import {options} from '../options';
import setChecks from '../setChecks';

export default function allChecks(fshInv) { // jQuery
  options.checkedElements = inventoryCheckAll;
  setChecks();
  $(fshInv).DataTable().draw(false);
}
