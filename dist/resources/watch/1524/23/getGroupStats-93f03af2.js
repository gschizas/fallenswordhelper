import { a3 as fallback, aR as places, o as onclick, s as partial, i as insertElement, t as createDocument, aB as retryAjax } from './calfSystem-2b1fed3f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-6f39680b.js';
import { c as createUl } from './createUl-aa61e05c.js';
import { c as createButton } from './createButton-31aa8751.js';
import { c as createLi } from './createLi-fdf8ad7a.js';
import { g as groupViewStats } from './groupViewStats-0051c13e.js';

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
//# sourceMappingURL=getGroupStats-93f03af2.js.map
