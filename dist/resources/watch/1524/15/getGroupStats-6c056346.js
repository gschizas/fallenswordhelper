import { a0 as fallback, aL as places, o as onclick, r as partial, i as insertElement, s as createDocument, aK as retryAjax } from './calfSystem-b469667c.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-938fcbbf.js';
import { c as createUl } from './createUl-e1d77960.js';
import { c as createButton } from './createButton-828d5198.js';
import { c as createLi } from './createLi-a9c37c09.js';
import { g as groupViewStats } from './groupViewStats-7e991588.js';

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
//# sourceMappingURL=getGroupStats-6c056346.js.map
