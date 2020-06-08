import { G as getValue, p as pCC, g as getElementsByTagName, l as getArrayByTagName, D as querySelector, i as insertElement, R as clickThis, f as on, s as partial } from './calfSystem-c0288c6c.js';
import './fshOpen-1a8bb979.js';
import './openQuickBuffByName-afe3cfbb.js';
import './dataRows-18018f77.js';
import { c as createTextArea } from './createTextArea-02a5e26a.js';
import './createStyle-36754c83.js';
import './parseDateAsTimestamp-7b30d3fe.js';
import './doBuffLinkClick-b2a75f61.js';
import { a as addLogColoring } from './addLogColoring-54193a16.js';

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

var undefined$1 = undefined;

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
//# sourceMappingURL=guildChat-9f93a22f.js.map
