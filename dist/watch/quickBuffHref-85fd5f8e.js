import { O as quickbuffUrl } from './calfSystem-05ea3a63.js';

function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}${passthru}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

export { quickBuffHref as q };
//# sourceMappingURL=quickBuffHref-85fd5f8e.js.map
