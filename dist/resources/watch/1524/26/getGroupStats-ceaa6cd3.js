import { o as onclick, W as sendEvent, i as insertElement, aR as places, t as createDocument, aB as retryAjax } from './calfSystem-c851a12c.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-df881f3c.js';
import { c as createUl } from './createUl-3a75ef99.js';
import { c as createButton } from './createButton-ca5d0529.js';
import { c as createLi } from './createLi-1be4a2e7.js';
import { c as chunk } from './chunk-5f9a7027.js';
import { g as groupViewStats } from './groupViewStats-9c1d46df.js';

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
//# sourceMappingURL=getGroupStats-ceaa6cd3.js.map
