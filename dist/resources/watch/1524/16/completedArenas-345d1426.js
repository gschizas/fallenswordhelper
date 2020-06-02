import { N as querySelector, o as onclick, b5 as arenaUrl, A as getText, r as partial } from './calfSystem-6e4b53e3.js';
import { d as dontPost } from './dontPost-2be1889c.js';
import { c as createInput } from './createInput-466cb7e7.js';
import { i as insertElementBefore } from './insertElementBefore-6a4c4d6a.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-4da82bee.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-02106a94.js';
import { i as insertElementAfter } from './insertElementAfter-667110e3.js';
import { u as updateUrl } from './updateUrl-3e4d9c6f.js';

function updateGoUrl(e) {
  e.preventDefault();
  dontPost(querySelector('#pCC input[value="completed"]').parentNode);
}

function intercept(val, fn) {
  onclick(querySelector(`#pCC input[value="${val}"]`), fn);
}

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
  intercept('View', updateUrl);
  intercept('Go', updateGoUrl);
}

export default completedArenas;
//# sourceMappingURL=completedArenas-345d1426.js.map
