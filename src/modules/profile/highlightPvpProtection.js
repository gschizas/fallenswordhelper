import getTextTrim from '../common/getTextTrim';
import getValue from '../system/getValue';
import {pointsUrl} from '../support/constants';
import querySelector from '../common/querySelector';

export default function highlightPvpProtection() {
  if (!getValue('highlightPvpProtection')) {return;}
  var pvpp = querySelector('#profileLeftColumn a[href="' + pointsUrl + '"]');
  if (getTextTrim(pvpp.parentNode.nextSibling) !== 'N/A') { // Text Node
    pvpp.parentNode.parentNode.style.cssText = 'border: 3px solid red'; // TODO
  }
}
