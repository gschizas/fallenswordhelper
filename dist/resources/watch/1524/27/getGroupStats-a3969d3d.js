import { o as onclick, X as sendEvent, i as insertElement, aR as places, t as createDocument, aC as retryAjax } from './calfSystem-975d976a.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-807be430.js';
import { c as createUl } from './createUl-e768b584.js';
import { c as createButton } from './createButton-05ae14e3.js';
import { c as createLi } from './createLi-c2648383.js';
import { c as chunk } from './chunk-001468bc.js';
import { g as groupViewStats } from './groupViewStats-79b9b8d2.js';

function getListItem(words, names) {
  const li = createLi();
  const btn = createButton({
    className: 'fshBl fshBls',
    textContent: words,
  });
  onclick(btn, (evt) => {
    evt.target.blur();
    openQuickBuffByName(names);
    sendEvent('doBuffLinks', words);
  });
  insertElement(li, btn);
  return li;
}

function makeButtons(acc, curr, i) {
  insertElement(acc, getListItem(`Buff ${places[i]} 16`, curr.join(',')));
  return acc;
}

function doBuffLinks(members) {
  const chunks = chunk(16, members);
  const ul = createUl();
  if (chunks.length > 1) {
    insertElement(ul, getListItem('Buff All', members.join(',')));
  }
  return chunks.reduce(makeButtons, ul);
}

function parseGroupStats(html) {
  const doc = createDocument(html);
  return groupViewStats(doc);
}

function getGroupStats(viewStats) {
  return retryAjax(viewStats).then(parseGroupStats);
}

export { doBuffLinks as d, getGroupStats as g };
//# sourceMappingURL=getGroupStats-a3969d3d.js.map
