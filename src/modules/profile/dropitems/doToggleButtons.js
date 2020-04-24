import calf from '../../support/calf';
import getElementsByTagName from '../../common/getElementsByTagName';
import { pCC } from '../../support/layout';
import setInnerHtml from '../../dom/setInnerHtml';

let insertHere;

function setInsertHere() {
  if (!insertHere) {
    const cltn = getElementsByTagName('form', pCC);
    if (cltn.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      insertHere = cltn[0].previousElementSibling.children[0];
    }
  }
}

function showHideLabel(pref) {
  if (pref) { return 'Hide'; }
  return 'Show';
}

export default function doToggleButtons(showExtraLinks, showQuickDropLinks) {
  // Option toggle buttons for both screens
  setInsertHere();
  if (insertHere) {
    let inject = `[<span id="fshShowExtraLinks" class="sendLink">${
      showHideLabel(showExtraLinks)} AH and UFSG links</span>]&nbsp;`
      + `[<span id="fshShowQuickDropLinks" class="sendLink">${
        showHideLabel(showQuickDropLinks)} Quick Drop links</span>]&nbsp;`;
    if (calf.subcmd2 === 'storeitems') {
      inject += '[<span id="fshSelectAllGuildLocked" class="sendLink">'
        + ' Select All Guild Locked</span>]&nbsp;';
    }
    setInnerHtml(inject, insertHere);
  }
}
