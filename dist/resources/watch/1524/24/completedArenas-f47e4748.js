import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-dea093d3.js';
import { c as createInput } from './createInput-dad0c5bb.js';
import { i as insertElementBefore } from './insertElementBefore-2ad05963.js';
import './formToUrl-a24fc80c.js';
import { i as interceptSubmit } from './interceptSubmit-609c1a86.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-8b209339.js';
import { i as insertElementAfter } from './insertElementAfter-b5cc5a08.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-fe3fd9fd.js';

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
//# sourceMappingURL=completedArenas-f47e4748.js.map
