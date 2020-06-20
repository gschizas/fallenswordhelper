import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-b0234231.js';
import { c as createInput } from './createInput-d7fbb3f3.js';
import { i as insertElementBefore } from './insertElementBefore-31b0f1b5.js';
import './formToUrl-a03ba266.js';
import { i as interceptSubmit } from './interceptSubmit-e148f699.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-ff725c17.js';
import { i as insertElementAfter } from './insertElementAfter-e7627fa1.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-026ae5fe.js';

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
//# sourceMappingURL=completedArenas-585511d0.js.map
