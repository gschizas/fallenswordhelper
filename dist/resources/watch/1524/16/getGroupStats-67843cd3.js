import { a1 as fallback, aS as places, o as onclick, r as partial, i as insertElement, s as createDocument, aR as retryAjax } from './calfSystem-6e4b53e3.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-150241d5.js';
import { c as createUl } from './createUl-02ef74f4.js';
import { c as createButton } from './createButton-2220711a.js';
import { c as createLi } from './createLi-7cff5a27.js';
import { g as groupViewStats } from './groupViewStats-5449b025.js';

function batchUp(acc, curr, i) {
  const slot = Math.floor(i / 16);
  acc[slot] = fallback(acc[slot], []);
  acc[slot].push(curr);
  return acc;
}

function makeButtons(acc, curr, i) {
  const theNames = curr.join(',');
  const modifierWord = places[i];
  const li = createLi();
  const btn = createButton({
    className: 'fshBl fshBls tip-static',
    dataset: { tipped: 'Quick buff functionality from HCS only does 16' },
    textContent: `Buff ${modifierWord} 16`,
  });
  onclick(btn, partial(openQuickBuffByName, theNames));
  insertElement(li, btn);
  insertElement(acc, li);
  return acc;
}

function doBuffLinks(members) {
  // quick buff only supports 16
  const shortList = members.reduce(batchUp, []).reduce(makeButtons, createUl());
  return shortList;
}

function parseGroupStats(html) {
  const doc = createDocument(html);
  return groupViewStats(doc);
}

function getGroupStats(viewStats) {
  return retryAjax(viewStats).then(parseGroupStats);
}

export { doBuffLinks as d, getGroupStats as g };
//# sourceMappingURL=getGroupStats-67843cd3.js.map
