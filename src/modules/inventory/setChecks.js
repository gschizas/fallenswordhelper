import {options} from './options';
import setForage from '../ajax/setForage';

export default function setChecks() {
  Array.prototype.forEach.call(
    document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
    function(el) {
      el.checked =
        options.checkedElements[el.getAttribute('item')] === 1;
    });
  setForage('fsh_inventory', options);
}
