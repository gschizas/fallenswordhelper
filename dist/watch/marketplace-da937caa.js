import { l as on, p as pCC, A as getElementById, C as setInnerHtml, ac as addCommas } from './calfSystem-1499e8da.js';
import './closest-84d0d41f.js';
import { c as closestTable } from './closestTable-116d085b.js';

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
//# sourceMappingURL=marketplace-da937caa.js.map
