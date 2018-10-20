import batch from './batch';
import getValue from '../system/getValue';
import {lastActivityRE} from '../support/constants';
import onlineDot from './onlineDot';

var dotList;

function changeOnlineDot(contactLink) {
  var lastActivity = lastActivityRE
    .exec(contactLink.dataset.tipped);
  contactLink.parentNode.previousSibling.innerHTML =
    onlineDot({
      min: lastActivity[3],
      hour: lastActivity[2],
      day: lastActivity[1]
    });
}

export default function colouredDots() {
  if (!getValue('enhanceOnlineDots')) {return;}
  dotList = document.querySelectorAll(
    '#pCC a[data-tipped*="Last Activity"]');
  batch(3, dotList, 0, changeOnlineDot);
}
