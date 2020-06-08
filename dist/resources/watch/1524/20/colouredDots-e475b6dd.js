import { G as getValue, ab as querySelectorAll, bs as lastActivityRE, A as setInnerHtml } from './calfSystem-c0288c6c.js';
import { o as onlineDot } from './onlineDot-071cab0f.js';
import { b as batch } from './batch-eda68c17.js';

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
//# sourceMappingURL=colouredDots-e475b6dd.js.map
