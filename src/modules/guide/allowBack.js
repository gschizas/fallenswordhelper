import on from '../common/on';
import querySelectorArray from '../common/querySelectorArray';

function makeUrl(prev, e) {
  return prev + '&' + e.name + '=' + e.value;
}

function updateUrl(evt) {
  evt.preventDefault();
  var validInputs = querySelectorArray('input:not([type="submit"])' +
    ':not([type="checkbox"]), select, input[type="checkbox"]:checked');
  window.location = validInputs.reduce(makeUrl, 'index.php?');
}

export default function allowBack() {
  on(document.querySelector('input[type="submit"]'), 'click', updateUrl);
}
