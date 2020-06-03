import { w as jQueryNotPresent, e as insertHtmlBeforeEnd, p as pCC, k as getArrayByTagName, r as partial } from './calfSystem-940bc1b5.js';
import './playerName-c80c4622.js';
import './idb-9fdca27d.js';
import './indexAjaxJson-c1eaa5d5.js';
import './cmdExport-76b2dc80.js';
import './getProfile-20d79fad.js';
import { m as myStats } from './myStats-b0b854d0.js';
import { r as reduceBuffArray } from './reduceBuffArray-7d138427.js';

const packRE = />\s*([ a-zA-Z]+) Level (\d+)/g;

const makeSpan = (bf) => `<br><span class="fshRed fshNoWrap">${bf[1]} ${
  bf[2]} active</span>`;

function checkForBuffs(myBuffs, el) {
  const { tipped } = el.dataset;
  const dupeBuffs = [...tipped.matchAll(packRE)]
    .filter((bf) => myBuffs[bf[1]] === Number(bf[2]));
  if (dupeBuffs.length > 0) {
    insertHtmlBeforeEnd(el.parentNode, dupeBuffs.map(makeSpan).join(''));
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

function injectRPUpgrades() { // jQuery.min
  if (jQueryNotPresent()) { return; }
  myStats(true).then(parseProfile);
}

export default injectRPUpgrades;
//# sourceMappingURL=injectRPUpgrades-b84d758a.js.map
