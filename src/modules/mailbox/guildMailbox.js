import {closestTable} from '../common/closest';
import * as ajax from '../support/ajax';
import * as layout from '../support/layout';

function takeResult(self, data) {
  if (data.r === 0) {
    closestTable(self).nextElementSibling.rows[0].cells[0].innerHTML =
      '<span class="fshGreen">Taken</span>';
  }
}

function guildMailboxEvent(e) {
  var self = e.target;
  if (self.tagName === 'IMG') {
    e.preventDefault();
    var anchor = self.parentNode.href;
    ajax.guildMailboxTake(anchor).done(takeResult.bind(null, self));
  }
  if (self.className === 'reportLink') {
    var nodeList = layout.pCC.getElementsByTagName('img');
    Array.prototype.forEach.call(nodeList, function(el) {el.click();});
  }
}

export default function guildMailbox() {
  layout.pCC.addEventListener('click', guildMailboxEvent);
  document.querySelector('#pCC td[height="25"]')
    .insertAdjacentHTML('beforeend',
      '<span class="reportLink">Take All</span>');
}
