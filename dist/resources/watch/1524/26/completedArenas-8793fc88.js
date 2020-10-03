import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-c851a12c.js';
import { c as createInput } from './createInput-5ba74825.js';
import { i as insertElementBefore } from './insertElementBefore-47c09359.js';
import './formToUrl-19af2e75.js';
import { i as interceptSubmit } from './interceptSubmit-ad55085a.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-21fda3e0.js';
import { i as insertElementAfter } from './insertElementAfter-22c058ed.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-f4659221.js';

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
//# sourceMappingURL=completedArenas-8793fc88.js.map
