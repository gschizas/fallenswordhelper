import {getElementById} from '../common/getElement';
import getUrlParameter from '../system/getUrlParameter';

function tickBuff(id) {
  var thisBuff = getElementById('skill-' + id);
  if (thisBuff) {
    thisBuff.checked = true;
  }
}

function tickBuffs(passThru) {
  passThru.split(';').forEach(tickBuff);
}

export default function doPassThru() {
  var passThru = getUrlParameter('blist');
  if (passThru) {tickBuffs(passThru);}
}
