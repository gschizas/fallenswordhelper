import {createSpan} from '../../../common/cElement';
import insertElement from '../../../common/insertElement';
import insertTextBeforeEnd from '../../../common/insertTextBeforeEnd';
import toggleForce from '../../../common/toggleForce';

var ddDiv;
var ddSpan;

function initDdDiv(containerDiv) {
  ddDiv = containerDiv.children[2];
  ddDiv.textContent = 'Damage bonus: ';
  ddSpan = createSpan();
  insertElement(ddDiv, ddSpan);
  insertTextBeforeEnd(ddDiv, '%');
}

function getDdBonus(dd, killStreak) {
  if (dd) {
    var ddPerc = Math.min(
      Math.round(
        Math.floor(killStreak / 5) * Number(dd.level)
      ) * 0.01, 20
    );
    var ddBonus = Math.round(ddPerc * 100) / 100;
    return ddBonus.toString();
  }
  return '0';
}

function hasDd(containerDiv, dd, ks) {
  if (ddDiv) {
    toggleForce(ddDiv, false);
  } else {
    initDdDiv(containerDiv);
  }
  ddSpan.textContent = getDdBonus(dd, Number(ks));
}

function hideDd() {
  if (ddDiv) {
    toggleForce(ddDiv, true);
  }
}

export default function doDeathDealer(containerDiv, dd, ks) {
  if (dd) {
    hasDd(containerDiv, dd, ks);
  } else {
    hideDd();
  }
}
