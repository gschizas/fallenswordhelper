import { f as insertHtmlBeforeEnd, h as hasClass, K as getTextTrim } from './calfSystem-0ffc234f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-66509d7c.js';

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
//# sourceMappingURL=doBuffLinkClick-cc64f0a9.js.map
