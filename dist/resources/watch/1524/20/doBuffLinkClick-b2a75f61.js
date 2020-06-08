import { e as insertHtmlBeforeEnd, h as hasClass, K as getTextTrim } from './calfSystem-c0288c6c.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-afe3cfbb.js';

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
//# sourceMappingURL=doBuffLinkClick-b2a75f61.js.map
