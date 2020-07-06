import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-2b1fed3f.js';
import { c as createInput } from './createInput-1f3f2b8b.js';
import { i as insertElementBefore } from './insertElementBefore-f1fdb06b.js';
import './formToUrl-b13d3faa.js';
import { i as interceptSubmit } from './interceptSubmit-b78fe85b.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-677b583a.js';
import { i as insertElementAfter } from './insertElementAfter-769b79b8.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-2512292b.js';

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
//# sourceMappingURL=completedArenas-2234a40f.js.map
