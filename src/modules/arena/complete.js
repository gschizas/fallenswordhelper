import * as assets from './assets';

function gotoPage(pageId) { // Native
  window.location = 'index.php?cmd=arena&subcmd=completed&page=' + pageId;
}

export function completedArenas() { // jQuery
  var prevButton = $('#pCC input[value="<"]');
  var nextButton = $('#pCC input[value=">"]');
  if (prevButton.length === 1) {
    var startButton = $('<input value="<<" type="button">');
    prevButton.before(startButton).before('&nbsp;');
    startButton.click(function() {gotoPage(1);});
  }
  if (nextButton.length === 1) {
    var lastPage = $('#pCC input[value="Go"]').closest('td').prev().text()
      .replace(/\D/g, '');
    var finishButton = $('<input value=">>" type="button">');
    nextButton.after(finishButton).after('&nbsp;');
    finishButton.click(function() {gotoPage(lastPage);});
  }
  $('#pCC input[value="View"]').click(assets.dontPost);
}
