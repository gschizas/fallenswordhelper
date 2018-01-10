import alpha from '../common/alpha';
import {createDiv} from '../common/cElement';
import eventHandler from '../common/eventHandler';
import extend from '../common/extend';
import getForage from '../ajax/getForage';
import {pCC} from '../support/layout';
import setForage from '../ajax/setForage';
import {fallback, isChecked, isSelected, testRange} from '../support/system';

var storeMap = 'fsh_potMap';
var defaultOpts = {
  pottab1: false,
  pottab2: false,
  pottab3: false,
  myMap: {},
  minpoint: 12,
  maxpoint: 20
};
var potObj;
var potOpts;
var inventory;
var mapping;
var thresholds;

function createContainer() {
  return createDiv({
    id: 'potReport',
    innerHTML: '<input id="pottab1" type="checkbox" name="pottabs"' +
      isChecked(potOpts.pottab1) + '>' +
      '<label for="pottab1">Composed Potion Inventory</label>' +
      '<input id="pottab2" type="checkbox" name="pottabs"' +
      isChecked(potOpts.pottab2) + '>' +
      '<label for="pottab2">Mapping</label>' +
      '<input id="pottab3" type="checkbox" name="pottabs"' +
      isChecked(potOpts.pottab3) + '>' +
      '<label for="pottab3">Thresholds</label>'
  });
}

function createThresholds() {
  return createDiv({
    id: 'thresholds',
    innerHTML: 'Min:' +
      '<input id="minpoint" type="number" value="' +
      potOpts.minpoint + '" min="0" max="999">' +
      'Max:' +
      '<input id="maxpoint" type="number" value="' +
      potOpts.maxpoint + '" min="0" max="999">',
  });
}

function sortKeys(obj) {
  return Object.keys(obj).sort(alpha).reduce(function(result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

function resetMap() {
  potOpts.myMap = Object.keys(potObj).reduce(function(prev, pot) {
    prev[pot] = pot;
    return prev;
  }, {});
}

function buildMap() {
  Object.keys(potObj).forEach(function(pot) {
    if (!potOpts.myMap[pot]) {potOpts.myMap[pot] = pot;}
  });
  potOpts.myMap = sortKeys(potOpts.myMap);
}

function buildOptions(select) {
  return '<select name="' + select +
    '"><option value="Ignore">Ignore</option>' +
    Object.keys(potOpts.myMap).reduce(function(prev, pot) {
      return prev + '<option value="' + pot + '"' +
        isSelected(pot, potOpts.myMap[select]) + '>' + pot + '</option>';
    }, '') + '</select>';
}

function drawMapping() {
  mapping.innerHTML = '<table><tbody>' +
    Object.keys(potOpts.myMap).reduce(function(prev, pot) {
      var options = buildOptions(pot);
      return prev + '<tr height="19px"><td>' + pot + '</td><td>' + options +
        '</td></tr>';
    }, '') + '<tr><td></td><td class="fshCenter">' +
    '<input id="fshReset" value="Reset" type="button">' +
    '</td></tr></tbody></table>';
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

function pivotPotObj(prev, pot) {
  if (potOpts.myMap[pot] !== 'Ignore') {
    if (prev[potOpts.myMap[pot]]) {
      prev[potOpts.myMap[pot]] += potObj[pot];
    } else {
      prev[potOpts.myMap[pot]] = potObj[pot];
    }
  }
  return prev;
}

function makeRowsFromPivot(pivot, prev, pot) {
  return prev + '<tr height="19px"><td>' + pot +
    '</td><td style="background-color: ' +
    perc2color((pivot[pot] - potOpts.minpoint) /
    (potOpts.maxpoint - potOpts.minpoint) * 100) + ';">' +
    pivot[pot].toString() + '</td></tr>';
}

function drawInventory() {
  var pivot = Object.keys(potObj).reduce(pivotPotObj, {});
  inventory.innerHTML = '<table><tbody>' +
    Object.keys(pivot).reduce(makeRowsFromPivot.bind(null, pivot), '') +
    '</tbody></table>';
}

function onChange(e) {
  if (e.target.tagName === 'SELECT') {
    potOpts.myMap[e.target.name] = e.target.value;
    setForage(storeMap, potOpts);
    drawInventory();
  }
}

function doReset() {
  resetMap();
  setForage(storeMap, potOpts);
  drawMapping();
  drawInventory();
}

function saveState(self) {
  var option = self.id;
  potOpts[option] = self.checked;
  setForage(storeMap, potOpts);
}

var evtHdl = [
  {
    test: function(self) {return self.id === 'fshReset';},
    act: doReset
  },
  {
    test: function(self) {
      return /^pottab\d$/.test(self.id);
    },
    act: saveState
  }
];

function onInput(e) {
  var self = e.target.id;
  var maybeValue = testRange(e.target.value, 0, 999);
  if (maybeValue) {
    potOpts[self] = maybeValue;
    setForage(storeMap, potOpts);
    drawInventory();
  }
}

function gotMap(data) {
  potOpts = extend({}, defaultOpts);
  extend(potOpts, fallback(data, {}));
  buildMap(potObj);
  setForage(storeMap, potOpts);
  var container = createContainer();
  var panels = createDiv({id: 'panels'});
  container.appendChild(panels);
  inventory = createDiv({id: 'inventory'});
  drawInventory();
  panels.appendChild(inventory);
  mapping = createDiv({id: 'mapping'});
  drawMapping();
  panels.appendChild(mapping);
  thresholds = createThresholds();
  panels.appendChild(thresholds);

  var myCell = pCC.lastElementChild.insertRow(2).insertCell(-1);
  myCell.addEventListener('change', onChange);
  myCell.addEventListener('click', eventHandler(evtHdl));
  myCell.addEventListener('input', onInput);
  myCell.appendChild(container);
}

export default function potReport(potObj_) {
  potObj = sortKeys(potObj_);
  getForage(storeMap).done(gotMap);
}
