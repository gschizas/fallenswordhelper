import { K as quickbuffUrl } from './calfSystem-6e4b53e3.js';

function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}${passthru}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

export { quickBuffHref as q };
//# sourceMappingURL=quickBuffHref-38a5391f.js.map
