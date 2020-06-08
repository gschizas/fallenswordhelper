import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-c0288c6c.js';
import { c as createInput } from './createInput-b62f0e66.js';
import { i as insertElementBefore } from './insertElementBefore-44fa3ff2.js';
import './formToUrl-112a5041.js';
import { i as interceptSubmit } from './interceptSubmit-cad751a8.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-fcaed482.js';
import { i as insertElementAfter } from './insertElementAfter-0225a22e.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-234464eb.js';

function gotoPage(pageId) {
  window.location = `${arenaUrl}completed&page=${pageId}`;
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
//# sourceMappingURL=completedArenas-35b70428.js.map
