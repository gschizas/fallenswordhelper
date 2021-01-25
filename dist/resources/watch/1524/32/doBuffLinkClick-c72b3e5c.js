import { f as insertHtmlBeforeEnd, h as hasClass, G as getTextTrim } from './calfSystem-e64be67d.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-4959f4e5.js';

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
//# sourceMappingURL=doBuffLinkClick-c72b3e5c.js.map
