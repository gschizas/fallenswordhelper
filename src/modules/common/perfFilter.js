import * as ajax from '../support/ajax';
import * as layout from '../support/layout';

var inv;
var target;

function selectPerf() { // Native
  var items = document.getElementById(target + '-items')
    .getElementsByClassName('selectable-item');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(e) {
    var thisItem = e.id.replace(target + '-item-', '');
    if (inv[thisItem].craft === 'Perfect') {e.click();}
  });
}

function drawFilters(data) { // Native
  inv = data.items;
  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'fshAC';
  buttonDiv.insertAdjacentHTML('beforeend',
    '<button class="fshBl">Perfect</button>');
  layout.pCC.appendChild(buttonDiv);
  buttonDiv.addEventListener('click', selectPerf);
}

export default function perfFilter(loc) { // jQuery.min
  target = loc;
  ajax.getInventoryById().done(drawFilters);
}
