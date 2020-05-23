import { O as quickbuffUrl } from './calfSystem-cb5d894f.js';

function quickBuffHref(aPlayerId, buffList) { // Bad Pattern
  let passthru = '';
  if (buffList) { passthru = `&blist=${buffList}`; }
  return `href='javascript:window.openWindow("${quickbuffUrl}&tid=${
    aPlayerId}${passthru}", "fsQuickBuff", 618, 1000, ",scrollbars")'`;
}

export { quickBuffHref as q };
//# sourceMappingURL=quickBuffHref-7e3973a6.js.map
