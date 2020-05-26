import { M as querySelector, o as onclick, b7 as arenaUrl, A as getText, r as partial } from './calfSystem-b469667c.js';
import { d as dontPost } from './dontPost-b432474a.js';
import { c as createInput } from './createInput-b6bf3e26.js';
import { i as insertElementBefore } from './insertElementBefore-26cea2a0.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-930e54b3.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-ebd132d2.js';
import { i as insertElementAfter } from './insertElementAfter-4a90c4f1.js';
import { u as updateUrl } from './updateUrl-d377e06e.js';

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
//# sourceMappingURL=completedArenas-617cbdd2.js.map
