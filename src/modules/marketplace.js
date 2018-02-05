import {addCommas} from './system/system';
import {closestTable} from './common/closest';
import {getElementById} from './common/getElement';
import {pCC} from './support/layout';

var amt;
var prc;
var warn;

function getAmount() {
  if (!amt) {amt = getElementById('amount');}
  return amt;
}

function getPrice() {
  if (!prc) {prc = getElementById('price');}
  return prc;
}

function getWarning() {
  if (!warn) {
    var requestTable = closestTable(getAmount());
    var newRow = requestTable.insertRow(2);
    warn = newRow.insertCell(0);
    warn.colSpan = '2';
    warn.className = 'fshCenter';
  }
  return warn;
}

function totalPrice(amount, sellPrice) {
  var gross = amount * sellPrice;
  return gross + Math.ceil(gross / 200);
}

function marketplaceWarning(sellPrice) {
  var amount = getAmount().value;
  getWarning().innerHTML = '<span class="fshBlue">You are offering to buy ' +
    '<b>' + amount + '</b> FSP for >> <b>' + addCommas(sellPrice) +
    '</b> (Total: ' + addCommas(totalPrice(amount, sellPrice)) + ')</span>';
}

function clearWarning() {
  if (warn && warn.innerHTML !== '') {warn.innerHTML = '';}
}

function addMarketplaceWarning() {
  var sellPrice = getPrice().value;
  if (sellPrice.search(/^[0-9]+$/) !== -1) {
    marketplaceWarning(sellPrice);
  } else {clearWarning();}
}

export default function marketplace() {
  pCC.addEventListener('keyup', addMarketplaceWarning);
}
