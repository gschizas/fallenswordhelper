import { w as jQueryNotPresent, e as insertHtmlBeforeEnd, p as pCC, k as getArrayByTagName, r as partial } from './calfSystem-6e4b53e3.js';
import './playerName-43cf6aad.js';
import './idb-fc617077.js';
import './indexAjaxJson-3f2c1d04.js';
import './cmdExport-67d5e685.js';
import './getProfile-c25f08ac.js';
import { m as myStats } from './myStats-e58f7e72.js';
import { r as reduceBuffArray } from './reduceBuffArray-28e47da0.js';

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
//# sourceMappingURL=injectRPUpgrades-ed6f8817.js.map
