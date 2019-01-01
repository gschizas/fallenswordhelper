import backgroundCreate from './backgroundCreate';
import getElementsByClassName from '../common/getElementsByClassName';
import insertElement from '../common/insertElement';
import insertElementAfter from '../common/insertElementAfter';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import on from '../common/on';
import once from '../common/once';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import {sendEvent} from '../support/fshGa';
import {subscribe} from '../support/pubsub';
import {createDiv, createInput, createTable} from '../common/cElement';

function doTableClass(myTable, slotsLeft) {
  myTable.classList.add('left-' + slotsLeft.toString());
}

function quickcreate(myTable) {
  var openTemplates = document.querySelectorAll('.quickCreate .sendLink');
  doTableClass(myTable, openTemplates.length);
}

function composePots(button, templateId) {
  sendEvent('composing', 'FastComposeButton');
  var openTemplates = document.querySelectorAll(
    '[id|="composing-template"]:not(#composing-template-multi)');
  for (var i = 0; i < button.value; i += 1) {
    openTemplates[i].value = templateId;
    backgroundCreate(openTemplates[i].nextElementSibling.nextElementSibling,
      openTemplates[i]);
  }
}

function handleClick(evt) {
  var button = evt.target;
  var templateId = button.dataset.templateId;
  if (templateId) {composePots(button, templateId);}
}

function buildButton(val, templateId) {
  return createInput({
    className: 'awesome orange',
    dataset: {templateId: templateId},
    type: 'button',
    value: val
  });
}

function buildCells(template, myRow, compSlot, i) {
  if (i === 0) {myRow.insertCell(-1).textContent = template[1];}
  insertElement(
    myRow.insertCell(-1),
    buildButton((i + 1).toString(), template[0])
  );
  return myRow;
}

function buildRows(compSlots, openSlots, myTable, template) {
  compSlots.reduce(partial(buildCells, template), myTable.insertRow(-1));
  return myTable;
}

function buildTable(templates, compSlots, openSlots) {
  var myTable = createTable({id: 'fshFastCompose'});
  doTableClass(myTable, openSlots);
  return templates.reduce(partial(buildRows, compSlots, openSlots), myTable);
}

function setupFastCompose(fcDiv, compSlots, openSlots) {
  var templates = Array.from(
    document.querySelectorAll('#composing-template-multi option'),
    function(el) {return [el.value, el.text];}
  );
  var myTable = buildTable(templates, compSlots, openSlots);
  insertElement(fcDiv, myTable);
  on(pCC, 'click', handleClick);
  subscribe('quickcreate', partial(quickcreate, myTable));
}

function openSlot(e) {return e.textContent === 'ETA: n/a';}

function drawList(fcDiv) {
  sendEvent('composing', 'FastCompose');
  insertHtmlBeforeEnd(fcDiv, '<br>');
  var compSlots = Array.from(
    getElementsByClassName('composing-potion-time', document)
  );
  var openSlots = compSlots.filter(openSlot).length;
  if (openSlots > 0) {
    setupFastCompose(fcDiv, compSlots, openSlots);
  } else {
    insertHtmlBeforeEnd(fcDiv, 'No open slots!');
  }
}

export default function fastCompose() {
  var buttonDiv = document.querySelector('#pCC div.centered');
  insertHtmlAfterEnd(buttonDiv.children[1],
    ' | <label for="fast-compose"><span class="sendLink">' +
    'Fast Compose</span></label>');
  var fcDiv = createDiv({className: 'centered'});
  insertElementAfter(fcDiv, buttonDiv);
  var fcCheck = createInput({id: 'fast-compose', type: 'checkbox'});
  insertElementAfter(fcCheck, buttonDiv);
  once(fcCheck, 'change', partial(drawList, fcDiv));
}
