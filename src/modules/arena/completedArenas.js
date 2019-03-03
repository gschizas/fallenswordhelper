import {arenaUrl} from '../support/constants';
import jQueryPresent from '../common/jQueryPresent';
import on from '../common/on';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import updateGoUrl from './updateGoUrl';
import updateUrl from './updateUrl';

function gotoPage(pageId) {
  window.location = arenaUrl + 'completed&page=' + pageId;
}

function lastPage() { // jQuery
  return $('#pCC input[value="Go"]').closest('td').prev().text()
    .replace(/\D/g, '');
}

function injectStartButton() { // jQuery
  var prevButton = $('#pCC input[value="<"]');
  if (prevButton.length === 1) {
    var startButton = $('<input value="<<" type="button">');
    prevButton.before(startButton).before('&nbsp;');
    startButton.on('click', partial(gotoPage, 1));
  }
}

function gotoLastPage() {gotoPage(lastPage());}

function injectFinishButton() { // jQuery
  var nextButton = $('#pCC input[value=">"]');
  if (nextButton.length === 1) {
    var finishButton = $('<input value=">>" type="button">');
    nextButton.after(finishButton).after('&nbsp;');
    finishButton.on('click', gotoLastPage);
  }
}

function overrideButtons() { // jQuery
  injectStartButton();
  injectFinishButton();
  $('#pCC input[value="View"]').on('click', updateUrl);
  on(querySelector('#pCC input[value="Go"]'), 'click', updateGoUrl);
}

export default function completedArenas() { // jQuery
  if (jQueryPresent()) {overrideButtons();}
}
