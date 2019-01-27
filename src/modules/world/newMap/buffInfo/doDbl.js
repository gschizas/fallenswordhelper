import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import insertTextBeforeEnd from '../../../common/insertTextBeforeEnd';
import setText from '../../../common/setText';
import toggleForce from '../../../common/toggleForce';

var dblDiv;
var dblSpan;

function initDblDiv(containerDiv) {
  dblDiv = containerDiv.children[4];
  dblDiv.className = 'fshRed';
  setText('Doubler ', dblDiv);
  dblSpan = createSpan();
  insertElement(dblDiv, dblSpan);
  insertTextBeforeEnd(dblDiv, ' active');
}

function hasDbl(containerDiv, dbl) {
  if (dblDiv) {
    toggleForce(dblDiv, false);
  } else {
    initDblDiv(containerDiv);
  }
  setText(dbl.level, dblSpan);
}

function hideDbl() {
  if (dblDiv) {
    toggleForce(dblDiv, true);
  }
}

export default function doDbl(containerDiv, dbl) {
  if (dbl) {
    hasDbl(containerDiv, dbl);
  } else {
    hideDbl();
  }
}
