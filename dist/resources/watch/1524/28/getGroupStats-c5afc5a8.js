import { o as onclick, W as sendEvent, i as insertElement, aQ as places, t as createDocument, aB as retryAjax } from './calfSystem-21d16a0e.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-5d44c758.js';
import { c as createUl } from './createUl-36561862.js';
import { c as createButton } from './createButton-cec8c74e.js';
import { c as createLi } from './createLi-f780ee20.js';
import { c as chunk } from './chunk-07c9710c.js';
import { g as groupViewStats } from './groupViewStats-bc2f1302.js';

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
//# sourceMappingURL=getGroupStats-c5afc5a8.js.map
