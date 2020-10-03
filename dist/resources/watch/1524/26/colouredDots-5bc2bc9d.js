import { G as getValue, ab as querySelectorAll, bq as lastActivityRE, A as setInnerHtml } from './calfSystem-c851a12c.js';
import { o as onlineDot } from './onlineDot-29205053.js';
import { b as batch } from './batch-9a06e8f3.js';

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
//# sourceMappingURL=colouredDots-5bc2bc9d.js.map
