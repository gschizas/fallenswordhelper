import allthen from '../../common/allthen';
import calf from '../../support/calf';
import daGuildFetchInv from '../../_dataAccess/daGuildFetchInv';
import daGuildReport from '../../_dataAccess/daGuildReport';
import daLoadInventory from '../../_dataAccess/daLoadInventory';
import getInventory from '../../ajax/getInventory';
import partial from '../../common/partial';

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
  if (!Array.isArray(data.r)) {return;}
  composed = Array.prototype.concat.apply([], data.r.map(el => el.items))
    .filter(composedPot);
}

function doComposedFromBp() {
  return daLoadInventory().then(getComposedFromBp);
}

function getComposedFromGs(data) {
  if (!Array.isArray(data.r)) {return;}
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
