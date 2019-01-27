import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import setText from '../../../common/setText';
import setTextCommas from '../../../common/setTextCommas';
import toggleForce from '../../../common/toggleForce';

var ksDiv;
var killStreakSpan;

function initKsDiv(containerDiv) {
  ksDiv = containerDiv.children[1];
  setText('Kill Streak: ', ksDiv);
  killStreakSpan = createSpan();
  insertElement(ksDiv, killStreakSpan);
}

function showKs(containerDiv, ks) {
  if (ksDiv) {
    toggleForce(ksDiv, false);
  } else {
    initKsDiv(containerDiv);
  }
  setTextCommas(ks, killStreakSpan);
}

function hideKs() {
  if (ksDiv) {
    toggleForce(ksDiv, true);
  }
}

export default function doKs(containerDiv, dd, titanActive, ks) {
  if (dd || titanActive) {
    showKs(containerDiv, ks);
  } else {
    hideKs();
  }
}
