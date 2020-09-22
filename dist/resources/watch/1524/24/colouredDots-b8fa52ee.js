import { G as getValue, ab as querySelectorAll, bs as lastActivityRE, A as setInnerHtml } from './calfSystem-dea093d3.js';
import { o as onlineDot } from './onlineDot-70e0df94.js';
import { b as batch } from './batch-11b62cdc.js';

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
//# sourceMappingURL=colouredDots-b8fa52ee.js.map
