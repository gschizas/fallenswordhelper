import { N as querySelector, o as onclick, b5 as arenaUrl, A as getText, r as partial } from './calfSystem-03895320.js';
import { d as dontPost } from './dontPost-8839e18d.js';
import { c as createInput } from './createInput-250e91b1.js';
import { i as insertElementBefore } from './insertElementBefore-1bcd7f1d.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-94b94a24.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-3f73e139.js';
import { i as insertElementAfter } from './insertElementAfter-a88181d5.js';
import { u as updateUrl } from './updateUrl-7530a8b3.js';

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
//# sourceMappingURL=completedArenas-53c6ce4f.js.map
