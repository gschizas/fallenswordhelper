import {options} from './options';
import saveOptions from './saveOptions';

export default function setChecks() {
  Array.prototype.forEach.call(
    document.querySelectorAll('table.fshInvFilter input[type="checkbox"]'),
    function(el) {
      el.checked =
        options.checkedElements[el.getAttribute('item')] === 1;
    });
  saveOptions(options);
}
