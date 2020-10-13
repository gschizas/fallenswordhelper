import { b3 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-21d16a0e.js';
import { c as createInput } from './createInput-6a4bfd74.js';
import { i as insertElementBefore } from './insertElementBefore-eada6f05.js';
import './formToUrl-2fddf9de.js';
import { i as interceptSubmit } from './interceptSubmit-719ace11.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-cd4d08fc.js';
import { i as insertElementAfter } from './insertElementAfter-ed23d739.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-db81d7e4.js';

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
//# sourceMappingURL=completedArenas-a496e980.js.map
