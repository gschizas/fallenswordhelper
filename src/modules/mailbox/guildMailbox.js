import {closestTable} from '../common/closest';
import dialog from '../ajax/dialog';
import infoBox from '../common/infoBox';
import jQueryNotPresent from '../common/jQueryNotPresent';
import {pCC} from '../support/layout';
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
  return retryAjax({url: href}).pipe(translateReturnInfo).done(dialog);
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
    guildMailboxTake(anchor).done(takeResult.bind(null, self));
  }
  if (self.className === 'sendLink') {
    var nodeList = pCC.getElementsByTagName('img');
    Array.prototype.forEach.call(nodeList, function(el) {el.click();});
  }
}

export default function guildMailbox() {
  if (jQueryNotPresent()) {return;}
  pCC.addEventListener('click', guildMailboxEvent);
  document.querySelector('#pCC td[height="25"]')
    .insertAdjacentHTML('beforeend',
      '<span class="sendLink">Take All</span>');
}
