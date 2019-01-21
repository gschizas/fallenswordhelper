import insertElement from '../../../common/insertElement';
import {textSpan} from '../../../common/cElement';
import toggleForce from '../../../common/toggleForce';

var cdDiv;
var cooldownSpan;
var lastTp;

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

function updateCooldown() {
  var secs = Math.max(Math.ceil((lastTp - Date.now()) / 1000), 0);
  cooldownSpan.textContent = secs.toString();
  if (secs > 0) {
    setTimeout(updateCooldown, 500);
  }
}

export function doCountdown(teleportCooldown) {
  if (cooldownSpan) {
    lastTp = Date.now() + teleportCooldown * 1000;
    updateCooldown();
  }
}

export function tpCooldown(containerDiv, cd) {
  if (cd) {
    hasCd(containerDiv, cd);
  } else {
    hideCd();
  }
}
