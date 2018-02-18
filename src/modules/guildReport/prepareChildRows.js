import add from '../support/task';
import {createSpan} from '../common/cElement';
import insertElement from '../common/insertElement';
import moreToDo from '../common/moreToDo';
import potReport from './potReport';

var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
  'Gut Rot Head Splitter|Serum');
var counter;
var nodeArray;
var nodeList;
var potObj;

function paintChild() {
  var limit = performance.now() + 1;
  while (moreToDo(limit, counter, nodeArray)) {
    var el = nodeList[counter];
    var inject = nodeArray[counter];
    insertElement(el, inject);
    counter += 1;
  }
  if (counter < nodeArray.length) {
    add(3, paintChild);
  }
}

function hideElement(test) {
  if (test) {return ' class="fshHide"';}
  return '';
}

function isEquipable(test) {
  if (test) {return 'recall';}
  return 'equip';
}

function addPotObj(item) {
  if (item.indexOf(' (Potion)') !== -1) {
    var itemName = item.replace(' (Potion)', '');
    if (potObj[itemName]) {
      potObj[itemName] += 1;
    } else {
      potObj[itemName] = 1;
    }
  }
}

function mySpan(el) {
  var secondHref = el.children.length === 2;
  var firstHref = hideElement(!secondHref);
  var itemName = el.previousElementSibling.innerHTML;
  addPotObj(itemName);
  var wearable = hideElement(wearRE.test(itemName));
  var equipable = isEquipable(secondHref);
  return createSpan({
    innerHTML: '<span' + firstHref +
    '> | <span class="sendLink recall tip-static" data-tipped="' +
    'Click to recall to backpack" mode="0" action="recall">Fast BP' +
    '</span></span>' +
    ' | <span class="sendLink recall tip-static" ' +
    'data-tipped="Click to recall to guild store" mode="1" ' +
    'action="recall">Fast GS</span>' +
    '<span' + wearable +
    '> | <span class="sendLink ' +
    equipable +
    '" mode="0" action="wear">Fast Wear</span></span>'
  });
}

function doSpan(el) {
  if (counter === 0) {
    el.previousSibling.setAttribute('width', '200px');
    el.setAttribute('width', '370px');
  } else {
    el.previousSibling.removeAttribute('width');
    el.removeAttribute('width');
  }
  nodeArray.push(mySpan(el));
}

function makeSpan() {
  var limit = performance.now() + 10;
  while (moreToDo(limit, counter, nodeList)) {
    var el = nodeList[counter];

    doSpan(el);

    counter += 1;
  }
  if (counter < nodeList.length) {
    add(3, makeSpan);
  } else {
    counter = 0;
    add(3, paintChild);
    potReport(potObj);
  }
}

export default function prepareChildRows() {
  nodeList = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td:nth-of-type(3n+0)');
  potObj = {};
  nodeArray = [];
  counter = 0;
  add(3, makeSpan);
}
