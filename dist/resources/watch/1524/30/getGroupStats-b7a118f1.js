import { o as onclick, W as sendEvent, i as insertElement, aQ as places, t as createDocument, aB as retryAjax } from './calfSystem-d357ca6f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-9578347f.js';
import { c as createUl } from './createUl-59f2f9ee.js';
import { c as createButton } from './createButton-5b3775c7.js';
import { c as createLi } from './createLi-f67322bc.js';
import { c as chunk } from './chunk-c85463de.js';
import { g as groupViewStats } from './groupViewStats-c155e3cc.js';

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
//# sourceMappingURL=getGroupStats-b7a118f1.js.map
