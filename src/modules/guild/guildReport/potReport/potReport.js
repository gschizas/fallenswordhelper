import alpha from '../../../common/alpha';
import {createDiv} from '../../../common/cElement';
import eventHandler5 from '../../../common/eventHandler5';
import extend from '../../../common/extend';
import fallback from '../../../system/fallback';
import getForage from '../../../ajax/getForage';
import insertElement from '../../../common/insertElement';
import isChecked from '../../../system/isChecked';
import on from '../../../common/on';
import {pCC} from '../../../support/layout';
import partial from '../../../common/partial';
import selfIdIs from '../../../common/selfIdIs';
import setForage from '../../../ajax/setForage';
import testRange from '../../../system/testRange';
import {drawInventory, initInventory} from './drawInventory';
import {drawMapping, initMapping} from './drawMapping';

var storeMap = 'fsh_potMap';
var defaultOpts = {
  pottab1: false,
  pottab2: false,
  pottab3: false,
  myMap: {},
  minpoint: 12,
  maxpoint: 20
};

function cloneObj(obj, result, key) {
  result[key] = obj[key];
  return result;
}

function sortKeys(obj) {
  return Object.keys(obj).sort(alpha).reduce(partial(cloneObj, obj), {});
}

function update(potOpts, pot) {
  if (!potOpts.myMap[pot]) {potOpts.myMap[pot] = pot;}
}

function buildMap(potOpts, potObj) {
  Object.keys(potObj).forEach(partial(update, potOpts));
  return sortKeys(potOpts.myMap);
}

function createContainer(potOpts) {
  return createDiv({
    id: 'potReport',
    innerHTML: '<input id="pottab1" type="checkbox"' +
      isChecked(potOpts.pottab1) + '>' +
      '<label for="pottab1">Composed Potion Inventory</label>' +
      '<input id="pottab2" type="checkbox"' +
      isChecked(potOpts.pottab2) + '>' +
      '<label for="pottab2">Mapping</label>' +
      '<input id="pottab3" type="checkbox"' +
      isChecked(potOpts.pottab3) + '>' +
      '<label for="pottab3">Thresholds</label>'
  });
}

function createThresholds(potOpts, panels) {
  var thresholds = createDiv({
    id: 'thresholds',
    innerHTML: 'Min:' +
      '<input id="minpoint" type="number" value="' +
      potOpts.minpoint + '" min="0" max="999">' +
      'Max:' +
      '<input id="maxpoint" type="number" value="' +
      potOpts.maxpoint + '" min="0" max="999">',
  });
  insertElement(panels, thresholds);
}

function onChange(potOpts, potObj, e) {
  if (e.target.tagName === 'SELECT') {
    potOpts.myMap[e.target.name] = e.target.value;
    setForage(storeMap, potOpts);
    drawInventory(potOpts, potObj);
  }
}

function reMap(ignore, prev, pot) {
  if (ignore) {
    prev[pot] = 'Ignore';
  } else {
    prev[pot] = pot;
  }
  return prev;
}

function resetMap(potOpts, potObj, ignore) {
  potOpts.myMap = Object.keys(potObj).reduce(partial(reMap, ignore), {});
}

function doReset(potOpts, potObj, ignore) {
  resetMap(potOpts, potObj, ignore);
  setForage(storeMap, potOpts);
  drawMapping(potOpts);
  drawInventory(potOpts, potObj);
}

function toggleTab(self) {return /^pottab\d$/.test(self.id);}

function saveState(potOpts, self) {
  var option = self.id;
  potOpts[option] = self.checked;
  setForage(storeMap, potOpts);
}

function clickEvents(potOpts, potObj) {
  return [
    [selfIdIs('fshIgnoreAll'), partial(doReset, potOpts, potObj, true)],
    [selfIdIs('fshReset'), partial(doReset, potOpts, potObj, null)],
    [toggleTab, partial(saveState, potOpts)]
  ];
}

function onInput(potOpts, potObj, e) {
  var self = e.target.id;
  var maybeValue = testRange(e.target.value, 0, 999);
  if (maybeValue) {
    potOpts[self] = maybeValue;
    setForage(storeMap, potOpts);
    drawInventory(potOpts, potObj);
  }
}

function cellEventHandlers(potOpts, potObj, myCell) {
  on(myCell, 'change', partial(onChange, potOpts, potObj));
  on(myCell, 'click', eventHandler5(clickEvents(potOpts, potObj)));
  on(myCell, 'input', partial(onInput, potOpts, potObj));
}

function injectCell(potOpts, potObj) {
  var myCell = pCC.lastElementChild.insertRow(2).insertCell(-1);
  cellEventHandlers(potOpts, potObj, myCell);
  return myCell;
}

function buildPanels(potOpts, potObj) {
  var container = createContainer(potOpts);
  var panels = createDiv({id: 'panels'});
  insertElement(container, panels);
  initInventory(potOpts, potObj, panels);
  initMapping(potOpts, panels);
  createThresholds(potOpts, panels);
  insertElement(injectCell(potOpts, potObj), container);
}

function gotMap(potObj, data) {
  var potOpts = extend({}, defaultOpts); // deep clone
  extend(potOpts, fallback(data, {}));
  potOpts.myMap = buildMap(potOpts, potObj);
  setForage(storeMap, potOpts);
  buildPanels(potOpts, potObj);
}

export default function potReport(potObj) {
  getForage(storeMap).done(partial(gotMap, sortKeys(potObj)));
}
