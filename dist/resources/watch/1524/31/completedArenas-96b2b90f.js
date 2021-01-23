import { aq as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-91adbec8.js';
import { c as createInput } from './createInput-835773c5.js';
import { i as insertElementAfter } from './insertElementAfter-0d57742e.js';
import { i as insertElementBefore } from './insertElementBefore-43970b1f.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-dac2bf7a.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-56d4dd80.js';
import { i as interceptSubmit } from './interceptSubmit-06382d8c.js';
import './formToUrl-b273f7df.js';

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
//# sourceMappingURL=completedArenas-96b2b90f.js.map
