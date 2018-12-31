import {dontPost} from './assets';
import jQueryPresent from '../common/jQueryPresent';

function gotoPage(pageId) {
  window.location = 'index.php?cmd=arena&subcmd=completed&page=' +
    pageId;
}

function lastPage() {
  return $('#pCC input[value="Go"]').closest('td').prev().text()
    .replace(/\D/g, '');
}

function injectStartButton() {
  var prevButton = $('#pCC input[value="<"]');
  if (prevButton.length === 1) {
    var startButton = $('<input value="<<" type="button">');
    prevButton.before(startButton).before('&nbsp;');
    startButton.click(function() {gotoPage(1);});
  }
}

function injectFinishButton() {
  var nextButton = $('#pCC input[value=">"]');
  if (nextButton.length === 1) {
    var finishButton = $('<input value=">>" type="button">');
    nextButton.after(finishButton).after('&nbsp;');
    finishButton.click(function() {gotoPage(lastPage());});
  }
}

function overrideButtons() {
  injectStartButton();
  injectFinishButton();
  $('#pCC input[value="View"]').click(dontPost);
}

export default function completedArenas() { // jQuery
  if (jQueryPresent()) {overrideButtons();}
}
