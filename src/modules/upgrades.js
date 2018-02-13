import {createSpan} from './common/cElement';
import {getElementById} from './common/getElement';
import insertElement from './common/insertElement';
import insertTextBeforeEnd from './common/insertTextBeforeEnd';
import intValue from './system/intValue';
import isNaN from './common/isNaN';
import {server} from './system/system';
import setValue from './system/setValue';

var upgrades;
var currentFSP;
var warehouse = {};

function findText(text) {
  return Array.prototype.find.call(upgrades, function(el) {
    return el.textContent.indexOf(text) !== -1;
  });
}

function getInputCell(label) {
  return findText(label).nextElementSibling.nextElementSibling
    .nextElementSibling;
}

function getInputElement(el) {
  return el.nextElementSibling.nextElementSibling
    .nextElementSibling.children[0].rows[0].cells[0].children[0];
}

function getRe(type, label) {
  if (label === 'amount') {
    return new RegExp('\\+(\\d+) ' + type);
  }
  return /(\d+)\xA0/;
}

function getValue(type, element, label) {
  if (!warehouse[type][label]) {
    var valRe = getRe(type, label);
    var value = element.textContent.match(valRe)[1];
    warehouse[type][label] = value;
  }
  return warehouse[type][label];
}

function getAmount(type, upgrade) {
  return getValue(type, upgrade, 'amount');
}

function getCost(type, upgrade) {
  return getValue(type, upgrade.nextElementSibling, 'cost');
}

function getCell(type, upgrade) {
  if (!warehouse[type]) {warehouse[type] = {};}
  if (!warehouse[type].span) {
    var span = createSpan();
    insertTextBeforeEnd(upgrade, ' ');
    insertElement(upgrade, span);
    warehouse[type].span = span;
  }
  return warehouse[type].span;
}

function doStamCount(type, upgrade, quantity, cell) {
  var amount = getAmount(type, upgrade);
  var cost = getCost(type, upgrade);
  // cap the value if the user goes over his current FSP
  var extraStam;
  if (quantity * cost <= currentFSP) {
    extraStam = quantity * amount;
    cell.className = 'fshBlue';
  } else {
    extraStam = Math.floor(currentFSP / cost) * amount;
    cell.className = 'fshRed';
  }
  cell.textContent = '(+' + extraStam + ' stamina)';
}

function updateStamCount(type, upgrade, evt) {
  var self = evt.target;
  var quantity = Number(self.value);
  var cell = getCell(type, upgrade);
  if (isNaN(quantity) || quantity === 0) {
    cell.className = 'fshHide';
    return;
  }
  doStamCount(type, upgrade, quantity, cell);
}

function injectUpgradeHelper(type) {
  var upgrade = findText(type);
  getInputElement(upgrade).addEventListener('keyup',
    updateStamCount.bind(null, type, upgrade));
}

function injectPoints() {
  currentFSP = intValue(getElementById('statbar-fsp').textContent);
  injectUpgradeHelper('Current');
  injectUpgradeHelper('Maximum');
  getInputCell('Gold').innerHTML = '<a href="' + server +
    'index.php?cmd=marketplace">Sell at Marketplace</a>';
}

function saveUpgradeValue(upgrade, key) {
  var text = findText(upgrade);
  var ratio = text.nextElementSibling.nextElementSibling;
  if (ratio) {
    var valueRE = /(\d+) \/ 115/;
    var value = Number(valueRE.exec(ratio.innerHTML)[1]);
    setValue(key, value + 5);
  }
}

export default function storePlayerUpgrades() {
  upgrades = document.querySelectorAll('#pCC > table:last-of-type > tbody > ' +
    'tr:nth-child(even) > td:first-child');
  saveUpgradeValue('+1 Max Allies', 'alliestotal');
  saveUpgradeValue('+1 Max Enemies', 'enemiestotal');
  injectPoints();
}
