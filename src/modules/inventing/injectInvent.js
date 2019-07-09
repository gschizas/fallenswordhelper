import {daDoInvent} from '../_dataAccess/_dataAccess';
import insertElement from '../common/insertElement';
import insertTextBeforeEnd from '../common/insertTextBeforeEnd';
import jsonFail from '../common/jsonFail';
import on from '../common/on';
import outputResult from '../common/outputResult';
import {pCC} from '../support/layout';
import querySelector from '../common/querySelector';
import {createInput, createOl, createSpan} from '../common/cElement';

var invAmount;
var invResultHeader;
var invResults;

function processResult(r) {
  if (r.item) {
    return '<span class="fshGreen">You successfully invented the item [' +
      r.item.n + '].</span>';
  }
  return '<span class="fshRed">You have failed to invent the item.</span>';
}

function quickInventDone(json) {
  if (jsonFail(json, invResults)) {return;}
  outputResult(processResult(json.r), invResults);
}

function initResults(str) {
  invResultHeader.innerHTML = str;
  invResults.innerHTML = '';
}

function quickInvent() {
  var amountToInvent = Number(invAmount.value);
  if (!amountToInvent) {
    initResults('');
    return;
  }
  var recipeID = querySelector('input[name="recipe_id"]').value;
  initResults('Inventing ' + String(amountToInvent) + ' Items');
  for (var i = 0; i < amountToInvent; i += 1) {
    daDoInvent(recipeID).then(quickInventDone);
  }
}

function makeCell(injector) {
  var myRow = injector.insertRow(-1);
  var myCell = myRow.insertCell(-1);
  myCell.className = 'fshCenter';
  return myCell;
}

function makeInvAmount(myCell) {
  insertTextBeforeEnd(myCell, 'Select how many to quick invent');
  invAmount = createInput({
    className: 'custominput fshNumberInput',
    min: 0,
    type: 'number',
    value: 1
  });
  insertElement(myCell, invAmount);
}

function makeQuickInv(myCell) {
  var quickInv = createInput({
    className: 'custombutton',
    type: 'button',
    value: 'Quick invent items'
  });
  insertElement(myCell, quickInv);
  on(quickInv, 'click', quickInvent);
}

function makeInvResultHeader(myCell) {
  invResultHeader = createSpan();
  insertElement(myCell, invResultHeader);
}

function makeInvResults(myCell) {
  invResults = createOl();
  insertElement(myCell, invResults);
}

function resultContainer(myCell) {
  makeInvResultHeader(myCell);
  makeInvResults(myCell);
}

function makeLayout(injector) {
  makeInvAmount(makeCell(injector));
  makeQuickInv(makeCell(injector));
  resultContainer(makeCell(injector));
}

export default function injectInvent() {
  makeLayout(pCC.lastElementChild);
}
