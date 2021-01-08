import { k as on, p as pCC, y as getElementById, A as setInnerHtml } from './calfSystem-d357ca6f.js';
import { a as addCommas } from './addCommas-508f0c08.js';
import './closest-3bdef2f3.js';
import { c as closestTable } from './closestTable-7fc942d4.js';

let amt;
let prc;
let warn;

function getAmount() {
  if (!amt) { amt = getElementById('amount'); }
  return amt;
}

function getPrice() {
  if (!prc) { prc = getElementById('price'); }
  return prc;
}

function getWarning() {
  if (!warn) {
    const requestTable = closestTable(getAmount());
    const newRow = requestTable.insertRow(2);
    warn = newRow.insertCell(0);
    warn.colSpan = '2';
    warn.className = 'fshCenter';
  }
  return warn;
}

function totalPrice(amount, sellPrice) {
  const gross = amount * sellPrice;
  return gross + Math.ceil(gross / 200);
}

function marketplaceWarning(sellPrice) {
  const amount = getAmount().value;
  setInnerHtml(`<span class="fshBlue">You are offering to buy <b>${
    amount}</b> FSP for >> <b>${addCommas(sellPrice)}</b> (Total: ${
    addCommas(totalPrice(amount, sellPrice))})</span>`, getWarning());
}

function clearWarning() {
  if (warn && warn.innerHTML !== '') { setInnerHtml('', warn); }
}

function addMarketplaceWarning() {
  const price = getPrice();
  if (price) {
    const sellPrice = price.value;
    if (sellPrice.search(/^[0-9]+$/) !== -1) {
      marketplaceWarning(sellPrice);
    } else { clearWarning(); }
  }
}

function marketplace() {
  on(pCC, 'keyup', addMarketplaceWarning);
}

export default marketplace;
//# sourceMappingURL=marketplace-53e4a92a.js.map
