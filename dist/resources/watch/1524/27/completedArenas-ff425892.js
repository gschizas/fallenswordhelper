import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-975d976a.js';
import { c as createInput } from './createInput-a26e969f.js';
import { i as insertElementBefore } from './insertElementBefore-543d9ef0.js';
import './formToUrl-5a234537.js';
import { i as interceptSubmit } from './interceptSubmit-653ee929.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4abf40c2.js';
import { i as insertElementAfter } from './insertElementAfter-33c04156.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-3fff3eba.js';

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
//# sourceMappingURL=completedArenas-ff425892.js.map
