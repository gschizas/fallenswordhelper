import { c as chunk } from './chunk-b2ca1969.js';
import { c as createButton } from './createButton-e47845da.js';
import { c as createLi } from './createLi-22312252.js';
import { c as createUl } from './createUl-8dbb2592.js';
import { o as onclick, X as sendEvent, i as insertElement, bd as places, t as createDocument, aE as retryAjax } from './calfSystem-e64be67d.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-4959f4e5.js';
import { g as groupViewStats } from './groupViewStats-80d866a4.js';

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
//# sourceMappingURL=getGroupStats-e6ce8b33.js.map
