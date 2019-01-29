import {indexPhp} from '../support/constants';
import querySelectorArray from './querySelectorArray';

function urlParam(e) {
  return e.name + '=' + e.value;
}

export default function dontPost(scope) {
  var validInputs = querySelectorArray(
    'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]), ' +
    'select, input[type="checkbox"]:checked', scope);
  window.location = indexPhp + '?' + validInputs.map(urlParam).join('&');
}
