import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import {pointsUrl} from '../support/constants';

export default function highlightPvpProtection() {
  if (!getValue('highlightPvpProtection')) {return;}
  var pvpp = document
    .querySelector('#profileLeftColumn a[href="' + pointsUrl + '"]');
  if (getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') {
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
  }
}
