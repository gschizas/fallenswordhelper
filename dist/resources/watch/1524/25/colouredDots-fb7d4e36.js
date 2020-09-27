import { G as getValue, ab as querySelectorAll, bs as lastActivityRE, A as setInnerHtml } from './calfSystem-0ffc234f.js';
import { o as onlineDot } from './onlineDot-0427e12a.js';
import { b as batch } from './batch-427b6015.js';

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
//# sourceMappingURL=colouredDots-fb7d4e36.js.map
