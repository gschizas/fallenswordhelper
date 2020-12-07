import { G as getValue, ab as querySelectorAll, bp as lastActivityRE, A as setInnerHtml } from './calfSystem-d357ca6f.js';
import { o as onlineDot } from './onlineDot-579824dd.js';
import { b as batch } from './batch-f74bc427.js';

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
//# sourceMappingURL=colouredDots-f5d022b5.js.map
