import { G as getValue, ab as querySelectorAll, bp as lastActivityRE, A as setInnerHtml } from './calfSystem-21d16a0e.js';
import { o as onlineDot } from './onlineDot-61e94a2d.js';
import { b as batch } from './batch-15fb3a1f.js';

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
//# sourceMappingURL=colouredDots-292cf85e.js.map
