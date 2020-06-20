import { ak as isFunction } from './calfSystem-b0234231.js';

let bp;

function getBackpack() { // jQuery
  if (!bp) {
    bp = $('#backpackContainer').data('hcsBackpack');
  }
  return bp;
}

const patchList = [];
let monkeyInstalled;

function installMonkey(theBackpack) {
  const oldShow = theBackpack._showPage;
  // eslint-disable-next-line no-param-reassign
  theBackpack._showPage = function _showPage(type, page) {
    if (!theBackpack.tabData) { return; }
    oldShow.call(theBackpack, type, page);
    if (patchList.length > 0) {
      patchList.forEach((fn) => fn(theBackpack));
    }
  };
  monkeyInstalled = true;
}

function monkeyBp(theBackpack, fn) {
  if (patchList.includes(fn)) { return; }
  if (!monkeyInstalled) { installMonkey(theBackpack); }
  if (isFunction(fn)) { patchList.push(fn); }
}

export { getBackpack as g, monkeyBp as m };
//# sourceMappingURL=monkeyBp-e5f21bb0.js.map
