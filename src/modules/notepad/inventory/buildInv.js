import allthen from '../../common/allthen';
import calf from '../../support/calf';
import getInventory from '../../ajax/getInventory';
import {isArray} from '../../common/isArray';
import partial from '../../common/partial';
import {
  daGuildFetchInv,
  daGuildReport,
  daLoadInventory
} from '../../_dataAccess/_dataAccess';

export var theInv;
var composed = [];

function cacheTheInv(data) {
  theInv = data;
}

function doInventory() {
  return getInventory().then(cacheTheInv);
}

const composedPot = el => el.t === 15;

function getComposedFromBp(data) {
  if (!isArray(data.r)) {return;}
  composed = Array.prototype.concat.apply([], data.r.map(el => el.items))
    .filter(composedPot);
}

function doComposedFromBp() {
  return daLoadInventory().then(getComposedFromBp);
}

function getComposedFromGs(data) {
  if (!isArray(data.r)) {return;}
  composed = composed.concat(data.r.filter(composedPot));
}

function doGs() {
  return daGuildFetchInv().then(getComposedFromGs);
}

function doReport() {
  return daGuildReport().then(getComposedFromGs);
}

function thisPot(inv_id, pot) {return pot.a === inv_id;}

function addComposedName(item) {
  if (item.type === 15) {
    var cp = composed.find(partial(thisPot, item.inv_id));
    if (cp) {item.item_name = cp.n;}
  }
}

function gotSomeStuff() {
  theInv.items.forEach(addComposedName);
}

export function buildInv() {
  var prm = [doInventory()];
  if (calf.subcmd === 'invmanagernew') {
    prm.push(doComposedFromBp());
  }
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(doGs());
    prm.push(doReport());
  }
  return allthen(prm, gotSomeStuff);
}
