import { b4 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-995e3482.js';
import { c as createInput } from './createInput-8a491535.js';
import { i as insertElementBefore } from './insertElementBefore-bda2029b.js';
import './formToUrl-c6f1dab2.js';
import { i as interceptSubmit } from './interceptSubmit-49a349aa.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-f52b317d.js';
import { i as insertElementAfter } from './insertElementAfter-b6afa3fb.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-a56db14d.js';

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
//# sourceMappingURL=completedArenas-e1073262.js.map
