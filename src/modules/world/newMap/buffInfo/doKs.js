import addCommas from '../../../system/addCommas';
import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import toggleForce from '../../../common/toggleForce';

var ksDiv;
var killStreakSpan;

function initKsDiv(containerDiv) {
  ksDiv = containerDiv.children[1];
  ksDiv.textContent = 'Kill Streak: ';
  killStreakSpan = createSpan();
  insertElement(ksDiv, killStreakSpan);
}

function showKs(containerDiv, ks) {
  if (ksDiv) {
    toggleForce(ksDiv, false);
  } else {
    initKsDiv(containerDiv);
  }
  killStreakSpan.textContent = addCommas(ks);
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
