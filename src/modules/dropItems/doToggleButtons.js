import calf from '../support/calf';
import {pCC} from '../support/layout';

var insertHere;

function showHideLabel(pref) {
  if (pref) {return 'Hide';}
  return 'Show';
}

export default function doToggleButtons(showExtraLinks, showQuickDropLinks) {
  // Option toggle buttons for both screens
  if (!insertHere) {
    insertHere = pCC.getElementsByTagName('form')[0]
      .previousElementSibling.firstElementChild;
  }
  var inject = '[<span id="fshShowExtraLinks" class="sendLink">' +
    showHideLabel(showExtraLinks) +
    ' AH and UFSG links</span>]&nbsp;' +
    '[<span id="fshShowQuickDropLinks" class="sendLink">' +
    showHideLabel(showQuickDropLinks) +
    ' Quick Drop links</span>]&nbsp;';
  if (calf.subcmd2 === 'storeitems') {
    inject += '[<span id="fshSelectAllGuildLocked" class="sendLink">' +
      ' Select All Guild Locked</span>]&nbsp;';
  }
  insertHere.innerHTML = inject;
}
