import batch from '../common/batch';
import {createSpan} from '../common/cElement';
import insertElement from '../common/insertElement';
import partial from '../common/partial';
import potReport from './potReport';

var wearRE = new RegExp('<b>|Bottle|Brew|Draft|Elixir|Potion|Jagua Egg|' +
  'Gut Rot Head Splitter|Serum');
var nodeArray;
var nodeList;
var potObj;

function doPaintChild(inject, localCounter) {
  var el = nodeList[localCounter];
  insertElement(el, inject);
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

function removeWidth(el) {
  if (el instanceof Element) {el.removeAttribute('width');}
}

function doSpan(el, localCounter) {
  if (localCounter === 0) {
    el.previousSibling.width = '200px';
    el.width = '370px';
  } else {
    removeWidth(el.previousSibling);
    removeWidth(el);
  }
  nodeArray.push(mySpan(el));
}

function finishSpan() {
  batch(nodeArray, 0, doPaintChild, partial(potReport, potObj));
}

export default function prepareChildRows() {
  nodeList = document.querySelectorAll('#pCC table table ' +
    'tr:not(.fshHide) td:nth-of-type(3n)');
  potObj = {};
  nodeArray = [];
  batch(nodeList, 0, doSpan, finishSpan);
}
