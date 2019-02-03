import clickThis from '../common/clickThis';
import {closestTable} from '../common/closest';
import dialog from '../ajax/dialog';
import getArrayByTagName from '../common/getArrayByTagName';
import infoBox from '../common/infoBox';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import jQueryNotPresent from '../common/jQueryNotPresent';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import retryAjax from '../ajax/retryAjax';

function translateReturnInfo(data) {
  var info = infoBox(data);
  var _r = {r: 1, m: info};
  if (info === 'Item was transferred to the guild store!') {
    _r = {r: 0, m: ''};
  }
  return _r;
}

function guildMailboxTake(href) {
  return retryAjax(href).pipe(translateReturnInfo).done(dialog);
}

function takeResult(self, data) {
  if (data.r === 0) {
    closestTable(self).nextElementSibling.rows[0].cells[0].innerHTML =
      '<span class="fshGreen">Taken</span>';
  }
}

function guildMailboxEvent(e) { // jQuery.min
  var self = e.target;
  if (self.tagName === 'IMG') {
    e.preventDefault();
    var anchor = self.parentNode.href;
    guildMailboxTake(anchor).done(partial(takeResult, self));
  }
  if (self.className === 'sendLink') {
    getArrayByTagName('img', pCC).forEach(clickThis);
  }
}

export default function guildMailbox() {
  if (jQueryNotPresent()) {return;}
  on(pCC, 'click', guildMailboxEvent);
  insertHtmlBeforeEnd(querySelector('#pCC td[height="25"]'),
    '<span class="sendLink">Take All</span>');
}
