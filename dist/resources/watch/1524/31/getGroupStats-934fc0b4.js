import { c as chunk } from './chunk-a5250b9a.js';
import { c as createButton } from './createButton-d7e54414.js';
import { c as createLi } from './createLi-19138cc0.js';
import { c as createUl } from './createUl-5035a7bc.js';
import { o as onclick, W as sendEvent, i as insertElement, bc as places, t as createDocument, aD as retryAjax } from './calfSystem-91adbec8.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-0ac7bd3b.js';
import { g as groupViewStats } from './groupViewStats-0fb4429d.js';

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
//# sourceMappingURL=getGroupStats-934fc0b4.js.map
