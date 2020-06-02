import { a1 as fallback, aS as places, o as onclick, r as partial, i as insertElement, s as createDocument, aR as retryAjax } from './calfSystem-f6498976.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-f15b9edc.js';
import { c as createUl } from './createUl-3134e2a5.js';
import { c as createButton } from './createButton-21149823.js';
import { c as createLi } from './createLi-107a8c5a.js';
import { g as groupViewStats } from './groupViewStats-16c3723e.js';

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
//# sourceMappingURL=getGroupStats-ed904211.js.map
