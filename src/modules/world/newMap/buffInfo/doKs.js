import createSpan from '../../../common/cElement/createSpan';
import insertElement from '../../../common/insertElement';
import setText from '../../../dom/setText';
import setTextCommas from '../../../common/setTextCommas';
import toggleForce from '../../../common/toggleForce';

let ksDiv;
let killStreakSpan;

function initKsDiv(containerDiv) {
  // eslint-disable-next-line prefer-destructuring
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
