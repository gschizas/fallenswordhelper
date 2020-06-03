import { N as querySelector, o as onclick, b5 as arenaUrl, A as getText, r as partial } from './calfSystem-940bc1b5.js';
import { d as dontPost } from './dontPost-2931988f.js';
import { c as createInput } from './createInput-90dfa3d0.js';
import { i as insertElementBefore } from './insertElementBefore-4c8d2347.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-e5e9560b.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f1bd8788.js';
import { i as insertElementAfter } from './insertElementAfter-73425c86.js';
import { u as updateUrl } from './updateUrl-8026df84.js';

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
//# sourceMappingURL=completedArenas-44d2f456.js.map
