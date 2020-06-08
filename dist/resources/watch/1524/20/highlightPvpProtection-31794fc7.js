import { D as querySelector, aa as pointsUrl, K as getTextTrim } from './calfSystem-c0288c6c.js';

function highlightPvpProtection() {
  const pvpp = querySelector(`#profileLeftColumn a[href="${pointsUrl}"]`);
  if (getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') { // Text Node
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
  }
}

export default highlightPvpProtection;
//# sourceMappingURL=highlightPvpProtection-31794fc7.js.map
