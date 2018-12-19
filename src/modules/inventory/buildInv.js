import calf from '../support/calf';
import fetchinv from '../app/guild/fetchinv';
import getInventory from '../ajax/getInventory';
import loadInventory from '../app/profile/loadInventory';
import report from '../app/guild/inventory/report';

export var theInv;
var composed = [];

function cacheTheInv(data) {
  theInv = data;
}

function getComposedFromBp(data) {
  composed = data.r.map(function(el) {return el.items;})
    .reduce(function(a, b) {return a.concat(b);})
    .filter(function(el) {return el.t === 15;});
}

function getComposedFromGs(data) {
  composed = composed.concat(data.r.filter(function(el) {return el.t === 15;}));
}

function gotSomeStuff() {
  theInv.items.forEach(function(item) {
    if (item.type === 15) {
      var cp = composed.find(function(pot) {return pot.a === item.inv_id;});
      item.item_name = cp.n;
    }
  });
}

export function buildInv() {
  var prm = [];
  prm.push(getInventory().done(cacheTheInv));
  if (calf.subcmd === 'invmanagernew') {
    prm.push(loadInventory().done(getComposedFromBp));
  }
  if (calf.subcmd === 'guildinvmgr') {
    prm.push(fetchinv().done(getComposedFromGs));
    prm.push(report().done(getComposedFromGs));
  }
  return $.when.apply($, prm).done(gotSomeStuff);
}
