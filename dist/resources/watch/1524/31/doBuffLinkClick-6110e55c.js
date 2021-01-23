import { f as insertHtmlBeforeEnd, h as hasClass, G as getTextTrim } from './calfSystem-91adbec8.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-0ac7bd3b.js';

function doBuffLink(playerLink) {
  insertHtmlBeforeEnd(playerLink.parentNode,
    ' <button class="fshBl fshBls">[b]</button>');
}

const isBuffLink = (target) => hasClass('fshBl', target)
  && target.previousElementSibling;

function doBuffLinkClick(e) {
  if (isBuffLink(e.target)) {
    openQuickBuffByName(getTextTrim(e.target.previousElementSibling));
  }
}

export { doBuffLinkClick as a, doBuffLink as d };
//# sourceMappingURL=doBuffLinkClick-6110e55c.js.map
