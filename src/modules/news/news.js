import getElementById from '../common/getElement';
import on from '../common/on';
import setInnerHtml from '../dom/setInnerHtml';

let maxcharacters;
let textArea;
let shoutboxPreview;

function updateShoutboxPreview() {
  let textContent = textArea.value;
  let chars = textContent.length;
  if (chars > maxcharacters) {
    textContent = textContent.substring(0, maxcharacters);
    textArea.value = textContent;
    chars = maxcharacters;
  }
  if (!shoutboxPreview) {
    shoutboxPreview = textArea.parentNode.parentNode.parentNode.parentNode
      .insertRow().insertCell();
  }
  setInnerHtml('<table class="sbpTbl"><tbody><tr>'
    + `<td class="sbpHdr">Preview (${chars}/${
      maxcharacters} characters)</td></tr><tr><td class="sbpMsg"><span>${
      textContent}</span></td></tr></tbody></table>`, shoutboxPreview);
}

function injectShoutboxWidgets() {
  textArea = getElementById('textInputBox');
  on(textArea, 'keyup', updateShoutboxPreview);
}

export function newsFsbox() {
  maxcharacters = 100;
  injectShoutboxWidgets();
}

export function newsShoutbox() {
  maxcharacters = 150;
  injectShoutboxWidgets();
}
