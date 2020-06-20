import { D as querySelector, aa as pointsUrl, K as getTextTrim } from './calfSystem-b0234231.js';

function highlightPvpProtection() {
  const pvpp = querySelector(`#profileLeftColumn a[href="${pointsUrl}"]`);
  if (pvpp && getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') { // Text Node
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
  }
}

export default highlightPvpProtection;
//# sourceMappingURL=highlightPvpProtection-a2fb3589.js.map
