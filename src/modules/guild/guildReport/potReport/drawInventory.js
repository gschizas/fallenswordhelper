import {createDiv} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import {keys} from '../../../common/keys';
import once from '../../../common/once';
import partial from '../../../common/partial';
import {sendEvent} from '../../../support/fshGa';
import sortKeys from './sortKeys';

var inventory;

function pivotPotObj(potOpts, potObj, prev, pot) {
  if (potOpts.myMap[pot] !== 'Ignore') {
    if (prev[potOpts.myMap[pot]]) {
      prev[potOpts.myMap[pot]] += potObj[pot];
    } else {
      prev[potOpts.myMap[pot]] = potObj[pot];
    }
  }
  return prev;
}

function perc2color(percent) {
  var perc = Math.max(Math.min(percent, 100), 0);
  var r;
  var g;
  var b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b;
  return '#' + ('000000' + h.toString(16)).slice(-6);
}

function makeRowsFromPivot(potOpts, pivot, prev, pot) {
  return prev + '<tr><td>' + pot +
    '</td><td style="background-color: ' +
    perc2color((pivot[pot] - potOpts.minpoint) /
    (potOpts.maxpoint - potOpts.minpoint) * 100) + ';">' +
    pivot[pot].toString() + '</td></tr>';
}

export function drawInventory(potOpts, potObj) {
  sendEvent('potReport', 'drawInventory');
  var pivot = sortKeys(keys(potObj)
    .reduce(partial(pivotPotObj, potOpts, potObj), {}));
  inventory.innerHTML = '<table><tbody>' +
    keys(pivot).reduce(partial(makeRowsFromPivot, potOpts, pivot), '') +
    '</tbody></table>';
}

export function initInventory(potOpts, potObj, panels) {
  inventory = createDiv({id: 'inventory'});
  if (potOpts.pottab1) {
    drawInventory(potOpts, potObj);
  } else {
    once(panels.parentNode.children[0], 'change',
      partial(drawInventory, potOpts, potObj));
  }
  insertElement(panels, inventory);
}
