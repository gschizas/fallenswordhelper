import getArrayByTagName from '../common/getArrayByTagName';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import myStats from '../ajax/myStats';
import { pCC } from '../support/layout';
import partial from '../common/partial';
import reduceBuffArray from '../common/reduceBuffArray';

const packRE = />\s*([ a-zA-Z]+) Level (\d+)/g;

function checkForBuffs(myBuffs, el) {
  const { tipped } = el.dataset;
  let packBuffs;
  while ((packBuffs = packRE.exec(tipped)) !== null) {
    if (myBuffs[packBuffs[1]] === Number(packBuffs[2])) {
      insertHtmlBeforeEnd(el.parentNode,
        `<br><span class="fshRed fshNoWrap">${packBuffs[1]} ${
          packBuffs[2]} active</span>`);
    }
  }
}

function postWarnings(myBuffs) {
  const packsRow = pCC.children[0].rows[9];
  if (!packsRow) { return; }
  getArrayByTagName('a', packsRow.cells[0].children[0])
    .forEach(partial(checkForBuffs, myBuffs));
}

function parseProfile(data) {
  if (data._skills.length !== 0) {
    const myBuffs = reduceBuffArray(data._skills);
    postWarnings(myBuffs);
  }
}

export default function injectRPUpgrades() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  myStats().then(parseProfile);
}
