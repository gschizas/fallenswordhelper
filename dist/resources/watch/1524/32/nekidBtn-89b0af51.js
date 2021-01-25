import { c as createButton } from './createButton-e47845da.js';
import { am as profile, y as getElementById, A as setInnerHtml, s as partial, X as sendEvent, m as getArrayByTagName, b as createDiv, i as insertElement, o as onclick } from './calfSystem-e64be67d.js';
import { i as insertTextBeforeEnd } from './insertTextBeforeEnd-82384fa0.js';

function unequipitem(item) {
  return profile({
    subcmd: 'unequipitem',
    inventory_id: item,
  });
}

// import { $dataAccess } from './_dataAccess';

function daUnequipItem(item) {
  // return $dataAccess(unequipitem, unequip, item);
  return unequipitem(item);
}

let profileCombatSetDiv;

function clearBox(link, json) {
  if (json.s) {
    setInnerHtml('', link.parentNode);
  }
}

function removeItem(link) {
  const item = /inventory_id=(\d+)/.exec(link.href)[1];
  if (item) {
    daUnequipItem(item).then(partial(clearBox, link));
  }
}

function getNekid() {
  sendEvent('profile', 'nekidBtn');
  const profileBlock = profileCombatSetDiv.nextElementSibling;
  getArrayByTagName('a', profileBlock).forEach(removeItem);
}

function makeButton() {
  const nekidDiv = createDiv({ className: 'fshCenter' });
  const theBtn = createButton({
    className: 'fshBl fshBls',
    textContent: 'Nekid',
  });
  insertTextBeforeEnd(nekidDiv, '[ ');
  insertElement(nekidDiv, theBtn);
  insertTextBeforeEnd(nekidDiv, ' ]');
  onclick(theBtn, getNekid);
  return nekidDiv;
}

function nekidBtn() {
  const profileRightColumn = getElementById('profileRightColumn');
  profileCombatSetDiv = getElementById('profileCombatSetDiv');
  const targetBr = profileCombatSetDiv.parentNode.nextElementSibling;
  const nekidDiv = makeButton();
  profileRightColumn.replaceChild(nekidDiv, targetBr);
}

export default nekidBtn;
//# sourceMappingURL=nekidBtn-89b0af51.js.map
