import { a3 as fallback, aR as places, o as onclick, i as insertElement, t as createDocument, aB as retryAjax } from './calfSystem-dea093d3.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-5e13d4f5.js';
import { c as createUl } from './createUl-d8a22607.js';
import { c as createButton } from './createButton-b66a74d8.js';
import { c as createLi } from './createLi-8a46712e.js';
import { g as groupViewStats } from './groupViewStats-b757f5fd.js';

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
    className: 'fshBl fshBls tooltip-top-left',
    dataset: { tooltip: 'Quick buff functionality from HCS only does 16' },
    textContent: `Buff ${modifierWord} 16`,
  });
  onclick(btn, (evt) => {
    evt.target.blur();
    openQuickBuffByName(theNames);
  });
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
//# sourceMappingURL=getGroupStats-29167497.js.map
