import { b3 as arenaUrl, B as getText, D as querySelector, o as onclick, s as partial } from './calfSystem-b31646eb.js';
import { c as createInput } from './createInput-f46aa44b.js';
import { i as insertElementBefore } from './insertElementBefore-7e0a7ce8.js';
import './formToUrl-16cc4fc0.js';
import { i as interceptSubmit } from './interceptSubmit-86cfff6d.js';
import { i as insertHtmlAfterEnd } from './insertHtmlAfterEnd-46737457.js';
import { i as insertElementAfter } from './insertElementAfter-33eff6be.js';
import { i as insertHtmlBeforeBegin } from './insertHtmlBeforeBegin-5f8d64c0.js';

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
//# sourceMappingURL=completedArenas-12ba2ead.js.map
