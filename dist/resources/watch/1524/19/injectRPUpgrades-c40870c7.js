import { w as jQueryNotPresent, e as insertHtmlBeforeEnd, p as pCC, k as getArrayByTagName, r as partial } from './calfSystem-03895320.js';
import './playerName-78c45c25.js';
import './idb-1121a73b.js';
import './indexAjaxJson-22cdf082.js';
import './cmdExport-8139127c.js';
import './getProfile-5bd710a9.js';
import { m as myStats } from './myStats-876d8020.js';
import { r as reduceBuffArray } from './reduceBuffArray-8c7293f3.js';

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
//# sourceMappingURL=injectRPUpgrades-c40870c7.js.map
