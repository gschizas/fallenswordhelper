import { a1 as fallback, aS as places, o as onclick, r as partial, i as insertElement, s as createDocument, aR as retryAjax } from './calfSystem-940bc1b5.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-6c92eabd.js';
import { c as createUl } from './createUl-456f2381.js';
import { c as createButton } from './createButton-c9f03266.js';
import { c as createLi } from './createLi-a956c96f.js';
import { g as groupViewStats } from './groupViewStats-ae5d4742.js';

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
//# sourceMappingURL=getGroupStats-a7c86194.js.map
