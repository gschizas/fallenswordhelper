import {options} from '../options';
import querySelectorArray from '../../../common/querySelectorArray';
import saveOptions from '../saveOptions';

export default function getChecks(fshInv) { // jQuery
  options.checkedElements = {};
  querySelectorArray('table.fshInvFilter input[type="checkbox"][item]:checked')
    .forEach(
      function(el) {options.checkedElements[el.getAttribute('item')] = 1;}
    );
  saveOptions(options);
  $(fshInv).DataTable().draw(false);
}
