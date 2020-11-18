import { f as insertHtmlBeforeEnd, h as hasClass, K as getTextTrim } from './calfSystem-b31646eb.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-7f76ac0b.js';

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
//# sourceMappingURL=doBuffLinkClick-f62b07c4.js.map
