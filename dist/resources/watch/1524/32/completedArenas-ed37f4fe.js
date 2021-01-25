import { N as navigateTo, ar as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-e64be67d.js';
import { c as createInput } from './createInput-515b8c6c.js';
import { i as insertElementAfter } from './insertElementAfter-d8d81f32.js';
import { i as insertElementBefore } from './insertElementBefore-aa28f497.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-3bb66451.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-14909cfe.js';
import { i as interceptSubmit } from './interceptSubmit-448d7237.js';
import './formToUrl-b80842cb.js';

function gotoPage(pageId) {
  navigateTo(`${arenaUrl}completed&page=${pageId}`);
}

const lastPage = () => getText(querySelector('#pCC input[value="Go"]')
  .parentNode.previousElementSibling).replace(/\D/g, '');

function injectStartButton() {
  const prevButton = querySelector('#pCC input[value="<"]');
  if (prevButton) {
    const startButton = createInput({ type: 'button', value: '<<' });
    insertElementBefore(startButton, prevButton);
    insertHtmlAfterEnd(startButton, '&nbsp;');
    onclick(startButton, partial(gotoPage, 1));
  }
}

function gotoLastPage() { gotoPage(lastPage()); }

function injectFinishButton() {
  const nextButton = querySelector('#pCC input[value=">"]');
  if (nextButton) {
    const finishButton = createInput({ type: 'button', value: '>>' });
    insertElementAfter(finishButton, nextButton);
    insertHtmlBeforeBegin(finishButton, '&nbsp;');
    onclick(finishButton, gotoLastPage);
  }
}

function completedArenas() {
  injectStartButton();
  injectFinishButton();
  interceptSubmit();
}

export default completedArenas;
//# sourceMappingURL=completedArenas-ed37f4fe.js.map
