import {arenaUrl} from '../support/constants';
//#if _DEV  //  arena crawler
import crawler from './crawler/crawler';
//#endif
import {createInput} from '../common/cElement';
import getText from '../common/getText';
import insertElementAfter from '../common/insertElementAfter';
import insertElementBefore from '../common/insertElementBefore';
import insertHtmlAfterEnd from '../common/insertHtmlAfterEnd';
import insertHtmlBeforeBegin from '../common/insertHtmlBeforeBegin';
import on from '../common/on';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import updateGoUrl from './updateGoUrl';
import updateUrl from './updateUrl';

function intercept(val, fn) {
  on(querySelector('#pCC input[value="' + val + '"]'), 'click', fn);
}

function gotoPage(pageId) {
  window.location = arenaUrl + 'completed&page=' + pageId;
}

const lastPage = () => getText(querySelector('#pCC input[value="Go"]')
  .parentNode.previousElementSibling).replace(/\D/g, '');

function injectStartButton() {
  const prevButton = querySelector('#pCC input[value="<"]');
  if (prevButton) {
    const startButton = createInput({type: 'button', value: '<<'});
    insertElementBefore(startButton, prevButton);
    insertHtmlAfterEnd(startButton, '&nbsp;');
    on(startButton, 'click', partial(gotoPage, 1));
  }
}

function gotoLastPage() {gotoPage(lastPage());}

function injectFinishButton() {
  const nextButton = querySelector('#pCC input[value=">"]');
  if (nextButton) {
    const finishButton = createInput({type: 'button', value: '>>'});
    insertElementAfter(finishButton, nextButton);
    insertHtmlBeforeBegin(finishButton, '&nbsp;');
    on(finishButton, 'click', gotoLastPage);
  }
}

export default function completedArenas() {
  injectStartButton();
  injectFinishButton();
  intercept('View', updateUrl);
  intercept('Go', updateGoUrl);
  //#if _DEV  //  crawler
  crawler();
  //#endif
}
