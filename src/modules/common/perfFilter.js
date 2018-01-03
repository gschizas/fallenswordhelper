import {createDiv} from './cElement';
import {getElementById} from '../common/getElement';
import getInventoryById from '../ajax/getInventoryById';
import {pCC} from '../support/layout';

var inv;
var target;

function selectPerf() {
  var items = getElementById(target + '-items')
    .getElementsByClassName('selectable-item');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(e) {
    var thisItem = e.id.replace(target + '-item-', '');
    if (inv[thisItem].craft === 'Perfect') {e.click();}
  });
}

function drawFilters(data) {
  inv = data.items;
  var buttonDiv = createDiv({className: 'fshAC'});
  buttonDiv.insertAdjacentHTML('beforeend',
    '<button class="fshBl">Perfect</button>');
  pCC.appendChild(buttonDiv);
  buttonDiv.addEventListener('click', selectPerf);
}

export default function perfFilter(loc) { // jQuery.min
  target = loc;
  getInventoryById().done(drawFilters);
}
