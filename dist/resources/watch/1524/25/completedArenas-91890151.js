import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-0ffc234f.js';
import { c as createInput } from './createInput-443dcaaf.js';
import { i as insertElementBefore } from './insertElementBefore-286ff14c.js';
import './formToUrl-a527c245.js';
import { i as interceptSubmit } from './interceptSubmit-b0fa4c9c.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-4c16b9cc.js';
import { i as insertElementAfter } from './insertElementAfter-c3e5b1aa.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-b80bd36b.js';

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
//# sourceMappingURL=completedArenas-91890151.js.map
