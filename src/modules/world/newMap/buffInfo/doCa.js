import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import insertTextBeforeEnd from '../../../common/insertTextBeforeEnd';
import toggleForce from '../../../common/toggleForce';

var caDiv;
var caSpan;

function initCaDiv(containerDiv) {
  caDiv = containerDiv.children[3];
  caDiv.className = 'fshBlue';
  caDiv.textContent = 'CA ';
  caSpan = createSpan();
  insertElement(caDiv, caSpan);
  insertTextBeforeEnd(caDiv, ' active');
}

function hasCa(containerDiv, ca) {
  if (caDiv) {
    toggleForce(caDiv, false);
  } else {
    initCaDiv(containerDiv);
  }
  caSpan.textContent = ca.level;
}

function hideCa() {
  if (caDiv) {
    toggleForce(caDiv, true);
  }
}

export default function doCa(containerDiv, ca) {
  if (ca) {
    hasCa(containerDiv, ca);
  } else {
    hideCa();
  }
}
