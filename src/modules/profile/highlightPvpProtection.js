import getValue from '../system/getValue';
import {pointsUrl} from '../support/constants';

export default function highlightPvpProtection() {
  if (!getValue('highlightPvpProtection')) {return;}
  var pvpp = document
    .querySelector('#profileLeftColumn a[href="' + pointsUrl + '"]');
  if (pvpp.parentNode.nextSibling.textContent.trim() !== 'N/A') {
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red';
  }
}
