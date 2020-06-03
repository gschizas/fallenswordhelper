import { w as jQueryNotPresent, P as clickThis, x as getElementById, b as createDiv, e as insertHtmlBeforeEnd, i as insertElement, p as pCC, o as onclick } from './calfSystem-03895320.js';
import { g as getArrayByClassName } from './getArrayByClassName-49f2d047.js';
import { g as getInventoryById } from './getInventoryById-3858f29d.js';

let inv;
let target;

function clickOnPerf(el) {
  const thisItem = el.id.replace(`${target}-item-`, '');
  if (inv[thisItem] && inv[thisItem].craft === 'Perfect') { clickThis(el); }
}

function selectPerf() {
  const items = getArrayByClassName('selectable-item',
    getElementById(`${target}-items`));
  if (items.length === 0) { return; } // ?
  items.forEach(clickOnPerf);
}

function drawFilters(data) {
  inv = data.items;
  const buttonDiv = createDiv({ className: 'fshAC' });
  insertHtmlBeforeEnd(buttonDiv,
    '<button class="fshBl">Perfect</button>');
  insertElement(pCC, buttonDiv);
  onclick(buttonDiv, selectPerf);
}

function perfFilter(loc) { // jQuery.min
  if (jQueryNotPresent()) { return; }
  target = loc;
  getInventoryById().then(drawFilters);
}

export { perfFilter as p };
//# sourceMappingURL=perfFilter-8a46c8fb.js.map
