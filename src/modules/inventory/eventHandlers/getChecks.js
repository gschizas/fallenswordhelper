import {options} from '../options';
import saveOptions from '../saveOptions';

export default function getChecks() { // jQuery
  options.checkedElements = {};
  Array.prototype.forEach.call(
    document.querySelectorAll(
      'table.fshInvFilter input[type="checkbox"][item]:checked'),
    function(el) {
      options.checkedElements[el.getAttribute('item')] = 1;
    });
  saveOptions(options);
  $('#fshInv').DataTable().draw(false);
}
