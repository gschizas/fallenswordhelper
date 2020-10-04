import { D as querySelector, ab as pointsUrl, K as getTextTrim } from './calfSystem-975d976a.js';

function highlightPvpProtection() {
  const pvpp = querySelector(`#profileLeftColumn a[href="${pointsUrl}"]`);
  if (pvpp && getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') { // Text Node
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
  }
}

export default highlightPvpProtection;
//# sourceMappingURL=highlightPvpProtection-b2e0a949.js.map
