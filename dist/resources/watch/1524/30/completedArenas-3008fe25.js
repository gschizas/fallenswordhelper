import { b3 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-d357ca6f.js';
import { c as createInput } from './createInput-1c302e98.js';
import { i as insertElementBefore } from './insertElementBefore-1b96a575.js';
import './formToUrl-b0bbd7c6.js';
import { i as interceptSubmit } from './interceptSubmit-8526eadf.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-8735ac4b.js';
import { i as insertElementAfter } from './insertElementAfter-db315247.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-0285756c.js';

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
//# sourceMappingURL=completedArenas-3008fe25.js.map
