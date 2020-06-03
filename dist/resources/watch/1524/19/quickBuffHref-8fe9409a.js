import { K as quickbuffUrl } from './calfSystem-03895320.js';

function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}${passthru}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

export { quickBuffHref as q };
//# sourceMappingURL=quickBuffHref-8fe9409a.js.map
