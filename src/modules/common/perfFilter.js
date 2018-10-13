import {createDiv} from './cElement';
import {getElementById} from '../common/getElement';
import getInventoryById from '../ajax/getInventoryById';
import insertElement from './insertElement';
import insertHtmlBeforeEnd from './insertHtmlBeforeEnd';
import jQueryNotPresent from './jQueryNotPresent';
import on from './on';
import {pCC} from '../support/layout';

var inv;
var target;

function selectPerf() {
  var items = getElementById(target + '-items')
    .getElementsByClassName('selectable-item');
  if (items.length === 0) {return;}
  Array.prototype.forEach.call(items, function(e) {
    var thisItem = e.id.replace(target + '-item-', '');
    if (inv[thisItem] && inv[thisItem].craft === 'Perfect') {e.click();}
  });
}

function drawFilters(data) {
  inv = data.items;
  var buttonDiv = createDiv({className: 'fshAC'});
  insertHtmlBeforeEnd(buttonDiv,
    '<button class="fshBl">Perfect</button>');
  insertElement(pCC, buttonDiv);
  on(buttonDiv, 'click', selectPerf);
}

export default function perfFilter(loc) { // jQuery.min
  if (jQueryNotPresent()) {return;}
  target = loc;
  getInventoryById().done(drawFilters);
}
