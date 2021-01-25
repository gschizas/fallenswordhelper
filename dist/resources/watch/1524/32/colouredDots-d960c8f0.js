import { b as batch } from './batch-c5313510.js';
import { H as getValue, ab as querySelectorAll, bz as lastActivityRE, A as setInnerHtml } from './calfSystem-e64be67d.js';
import { o as onlineDot } from './onlineDot-078ba87d.js';

function changeOnlineDot(contactLink) {
  const lastActivity = lastActivityRE.exec(contactLink.dataset.tipped);
  setInnerHtml(onlineDot({
    min: lastActivity[3],
    hour: lastActivity[2],
    day: lastActivity[1],
  }), contactLink.parentNode.previousElementSibling);
}

function colouredDots() {
  if (!getValue('enhanceOnlineDots')) { return; }
  batch([
    5,
    3,
    querySelectorAll('#pCC a[data-tipped*="Last Activity"]'),
    0,
    changeOnlineDot,
  ]);
}

export { colouredDots as c };
//# sourceMappingURL=colouredDots-d960c8f0.js.map
