import { o as onclick, W as sendEvent, i as insertElement, aR as places, t as createDocument, aB as retryAjax } from './calfSystem-0ffc234f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-66509d7c.js';
import { c as createUl } from './createUl-42a77406.js';
import { c as createButton } from './createButton-1d22f846.js';
import { c as createLi } from './createLi-9c268111.js';
import { c as chunk } from './chunk-a1c62f77.js';
import { g as groupViewStats } from './groupViewStats-f690b86c.js';

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
//# sourceMappingURL=getGroupStats-1b18d564.js.map
