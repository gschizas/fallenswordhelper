import { w as jQueryNotPresent, o as onclick, p as pCC, e as insertHtmlBeforeEnd, N as querySelector, ba as infoBoxFrom, aR as retryAjax, z as setInnerHtml, r as partial, k as getArrayByTagName, P as clickThis } from './calfSystem-03895320.js';
import './dialogMsg-8a1f6974.js';
import './closest-6956725d.js';
import { c as closestTable } from './closestTable-6f52bd33.js';
import { d as dialog } from './dialog-b2576a6e.js';

function translateReturnInfo(data) {
  const info = infoBoxFrom(data);
  let returnInfo = { r: 1, m: info };
  if (info === 'Item was transferred to the guild store!') {
    returnInfo = { r: 0, m: '' };
  }
  return returnInfo;
}

function guildMailboxTake(href) {
  return retryAjax(href).then(translateReturnInfo).then(dialog);
}

function takeResult(target, data) {
  if (data.r === 0) {
    setInnerHtml('<span class="fshGreen">Taken</span>',
      closestTable(target).nextElementSibling.rows[0].cells[0]);
  }
}

function guildMailboxEvent(e) { // jQuery.min
  const { target } = e;
  if (target.tagName === 'IMG') {
    e.preventDefault();
    const anchor = target.parentNode.href;
    guildMailboxTake(anchor).then(partial(takeResult, target));
  }
  if (target.className === 'sendLink') {
    getArrayByTagName('img', pCC).forEach(clickThis);
  }
}

function guildMailbox() {
  if (jQueryNotPresent()) { return; }
  onclick(pCC, guildMailboxEvent);
  insertHtmlBeforeEnd(querySelector('#pCC td[height="25"]'),
    '<span class="sendLink">Take All</span>');
}

export default guildMailbox;
//# sourceMappingURL=guildMailbox-0367bda0.js.map
