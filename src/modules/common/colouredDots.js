import batch from './batch';
import getValue from '../system/getValue';
import { lastActivityRE } from '../support/constants';
import onlineDot from './onlineDot';
import querySelectorAll from './querySelectorAll';
import setInnerHtml from '../dom/setInnerHtml';

function changeOnlineDot(contactLink) {
  const lastActivity = lastActivityRE.exec(contactLink.dataset.tipped);
  setInnerHtml(onlineDot({
    min: lastActivity[3],
    hour: lastActivity[2],
    day: lastActivity[1],
  }), contactLink.parentNode.previousElementSibling);
}

export default function colouredDots() {
  if (!getValue('enhanceOnlineDots')) { return; }
  batch([
    5,
    3,
    querySelectorAll('#pCC a[data-tipped*="Last Activity"]'),
    0,
    changeOnlineDot,
  ]);
}
