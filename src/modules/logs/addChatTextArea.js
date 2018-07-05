import {createTextArea} from '../common/cElement';
import getValue from '../system/getValue';
import insertElement from '../common/insertElement';
import {pCC} from '../support/layout';

function removeCrlf(fshTxt) {
  return function() {
    fshTxt.value = fshTxt.value.replace(/\r\n|\n|\r/g, ' ');
  };
}

function setDoChat(el) {
  el.setAttribute('form', 'dochat');
}

function giveFormId() {
  var formList = pCC.getElementsByTagName('form');
  formList[0].id = 'dochat';
  return formList[0];
}

function giveInputsId() {
  var inputList = pCC.getElementsByTagName('input');
  var filteredList = Array.prototype.slice.call(inputList, 0, 7);
  filteredList.forEach(function(el) {setDoChat(el);});
  return filteredList[5];
}

function rearrangeTable(btnMass) {
  var theTable = document.querySelector('#pCC table table');
  theTable.rows[0].cells[0].remove();
  var myCell = theTable.insertRow(-1).insertCell(-1);
  insertElement(myCell, btnMass);
  var ourTd = theTable.rows[0].cells[0];
  ourTd.rowSpan = 2;
  return ourTd;
}

function keypress(sendBtn) {
  return function(evt) {
    if (evt.code === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      sendBtn.click();
    }
  };
}

function makeTextArea(sendBtn) {
  var fshTxt = createTextArea({
    cols: 72,
    name: 'msg',
    required: true,
    rows: 2
  });
  setDoChat(fshTxt);
  fshTxt.addEventListener('keypress', keypress(sendBtn));
  return fshTxt;
}

function hasTextEntry() {
  var btnMass = document.querySelector('input[value="Send As Mass"]');
  if (!btnMass) {return;}
  var theForm = giveFormId();
  var sendBtn = giveInputsId();
  var ourTd = rearrangeTable(btnMass);
  var fshTxt = makeTextArea(sendBtn);
  ourTd.replaceChild(fshTxt, ourTd.children[0]);
  theForm.addEventListener('submit', removeCrlf(fshTxt));
}

export default function addChatTextArea() {
  if (!getValue('enhanceChatTextEntry') || !pCC) {return;}
  hasTextEntry();
}
