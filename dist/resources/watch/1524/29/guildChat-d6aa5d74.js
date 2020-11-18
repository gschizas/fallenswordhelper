import { G as getValue, p as pCC, g as getElementsByTagName, m as getArrayByTagName, D as querySelector, i as insertElement, Q as clickThis, k as on, s as partial } from './calfSystem-b31646eb.js';
import './createStyle-e51e5eb9.js';
import './fshOpen-71b2b356.js';
import './openQuickBuffByName-7f76ac0b.js';
import './dataRows-af2f1179.js';
import { c as createTextArea } from './createTextArea-e63c25ea.js';
import './parseDateAsTimestamp-b0cacca1.js';
import './doBuffLinkClick-f62b07c4.js';
import { a as addLogColoring } from './addLogColoring-969e6dda.js';

function removeCrlf(fshTxt) {
  // eslint-disable-next-line no-param-reassign
  fshTxt.value = fshTxt.value.replace(/\r\n|\n|\r/g, ' ');
}

function setDoChat(el) {
  el.setAttribute('form', 'dochat');
}

function giveFormId() {
  const formList = getElementsByTagName('form', pCC);
  formList[0].id = 'dochat';
  return formList[0];
}

function giveInputsId() {
  const filteredList = getArrayByTagName('input', pCC).slice(0, 7);
  filteredList.forEach(setDoChat);
  return filteredList[5];
}

function rearrangeTable(btnMass) {
  const theTable = querySelector('#pCC table table');
  theTable.rows[0].cells[0].remove();
  const myCell = theTable.insertRow(-1).insertCell(-1);
  insertElement(myCell, btnMass);
  const ourTd = theTable.rows[0].cells[0];
  ourTd.rowSpan = 2;
  return ourTd;
}

function keypress(sendBtn, evt) {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    evt.preventDefault();
    clickThis(sendBtn);
  }
}

function makeTextArea(sendBtn) {
  const fshTxt = createTextArea({
    cols: 72,
    name: 'msg',
    required: true,
    rows: 2,
  });
  setDoChat(fshTxt);
  on(fshTxt, 'keypress', partial(keypress, sendBtn));
  return fshTxt;
}

function hasTextEntry() {
  const btnMass = querySelector('input[value="Send As Mass"]');
  if (!btnMass) { return; }
  const theForm = giveFormId();
  const sendBtn = giveInputsId();
  const ourTd = rearrangeTable(btnMass);
  const fshTxt = makeTextArea(sendBtn);
  ourTd.replaceChild(fshTxt, ourTd.children[0]);
  on(theForm, 'submit', partial(removeCrlf, fshTxt));
}

function addChatTextArea() {
  if (!getValue('enhanceChatTextEntry') || !pCC) { return; }
  hasTextEntry();
}

var css = ".fshGc {\n  table-layout: fixed;\n  overflow-wrap: break-word;\n}\n.fshGc td:nth-child(1) {width: 120px;}\n.fshGc td:nth-child(2) {width: 100px;}\n.fshGc td:nth-child(3) {width: 418px;}\n";
var modules_ecc4a754 = {};

function guildChatStyling() {
  if (!getValue('wrapGuildChat')) { return; }
  const chatTable = querySelector('#pCC table table table table');
  if (!chatTable) { return; }
  chatTable.classList.add('fshGc');
}

function guildChat() {
  addChatTextArea();
  guildChatStyling();
  addLogColoring('Chat', 0);
}

export default guildChat;
//# sourceMappingURL=guildChat-d6aa5d74.js.map
