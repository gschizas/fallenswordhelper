import insertElement from '../../../common/insertElement';
import {textSpan} from '../../../common/cElement';
import toggleForce from '../../../common/toggleForce';

var cdDiv;
var cooldownSpan;

function initCdDiv(containerDiv, cd) {
  cdDiv = containerDiv.children[5];
  cdDiv.textContent = 'Teleport Cooldown: ';
  cooldownSpan = textSpan(cd.toString());
  insertElement(cdDiv, cooldownSpan);
}

function hasCd(containerDiv, cd) {
  if (cdDiv) {
    toggleForce(cdDiv, false);
  } else {
    initCdDiv(containerDiv, cd);
  }
}

function hideCd() {
  if (cdDiv) {
    toggleForce(cdDiv, true);
  }
}

export function doCountdown(secs) {
  if (cooldownSpan) {
    cooldownSpan.textContent = secs.toString();
    if (secs > 0) {
      setTimeout(doCountdown, 1000, secs - 1);
    }
  }
}

export function tpCooldown(containerDiv, cd) {
  if (cd) {
    hasCd(containerDiv, cd);
  } else {
    hideCd();
  }
}
