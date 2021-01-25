import { H as getValue, p as pCC, g as getElementsByTagName, m as getArrayByTagName, D as querySelector, i as insertElement, R as clickThis, k as on, s as partial } from './calfSystem-e64be67d.js';
import { c as createTextArea } from './createTextArea-22ac6875.js';
import { a as addLogColoring } from './addLogColoring-3c642eb8.js';
import './createStyle-a8452c9b.js';
import './dataRows-0710c4a0.js';
import './doBuffLinkClick-c72b3e5c.js';
import './openQuickBuffByName-4959f4e5.js';
import './fshOpen-56a6fafa.js';
import './parseDateAsTimestamp-e42c8c35.js';

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
//# sourceMappingURL=guildChat-5cfb8b0f.js.map
