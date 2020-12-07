import { f as insertHtmlBeforeEnd, h as hasClass, K as getTextTrim } from './calfSystem-d357ca6f.js';
import { o as openQuickBuffByName } from './openQuickBuffByName-9578347f.js';

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
//# sourceMappingURL=doBuffLinkClick-a7bdaf2c.js.map
