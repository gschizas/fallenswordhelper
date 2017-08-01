import calf from '../support/calf';
import * as layout from '../support/layout';

var insertHere;

function showHideLabel(pref) {
  if (pref) {return 'Hide';}
  return 'Show';
}

export default function doToggleButtons(showExtraLinks, showQuickDropLinks) {
  // Option toggle buttons for both screens
  if (!insertHere) {
    insertHere = layout.pCC.getElementsByTagName('form')[0]
      .previousElementSibling.firstElementChild;
  }
  var inject = '[<span id="fshShowExtraLinks" class="reportLink">' +
    showHideLabel(showExtraLinks) +
    ' AH and UFSG links</span>]&nbsp;' +
    '[<span id="fshShowQuickDropLinks" class="reportLink">' +
    showHideLabel(showQuickDropLinks) +
    ' Quick Drop links</span>]&nbsp;';
  if (calf.subcmd2 === 'storeitems') {
    inject += '[<span id="fshSelectAllGuildLocked" class="reportLink">' +
      ' Select All Guild Locked</span>]&nbsp;';
  }
  insertHere.innerHTML = inject;
}
