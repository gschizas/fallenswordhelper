import { o as onclick, W as sendEvent, i as insertElement, aQ as places, t as createDocument, aB as retryAjax } from './calfSystem-b31646eb.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-7f76ac0b.js';
import { c as createUl } from './createUl-d466fd81.js';
import { c as createButton } from './createButton-f31e86ba.js';
import { c as createLi } from './createLi-ee9c1272.js';
import { c as chunk } from './chunk-a86d7cea.js';
import { g as groupViewStats } from './groupViewStats-1298c19e.js';

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
//# sourceMappingURL=getGroupStats-f6dac17a.js.map
