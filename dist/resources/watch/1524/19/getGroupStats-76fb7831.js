import { a1 as fallback, aS as places, o as onclick, r as partial, i as insertElement, s as createDocument, aR as retryAjax } from './calfSystem-03895320.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-1f6354c1.js';
import { c as createUl } from './createUl-1c5fe778.js';
import { c as createButton } from './createButton-237bac35.js';
import { c as createLi } from './createLi-2f027b08.js';
import { g as groupViewStats } from './groupViewStats-09bf8d5c.js';

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
//# sourceMappingURL=getGroupStats-76fb7831.js.map
