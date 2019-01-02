import {getElementById} from '../common/getElement';
import getElementsByTagName from '../common/getElementsByTagName';
import insertElement from '../common/insertElement';
import insertTextBeforeEnd from '../common/insertTextBeforeEnd';
import on from '../common/on';
import {sendEvent} from '../support/fshGa';
import unequipitem from '../app/profile/unequipitem';
import {createButton, createDiv} from '../common/cElement';

var profileCombatSetDiv;

function removeItem(link) {
  function clearBox(json) {
    if (json.s) {
      link.parentNode.innerHTML = '';
    }
  }
  var item = /inventory_id=(\d+)/.exec(link.href)[1];
  if (item) {
    unequipitem(item).done(clearBox);
  }
}

function getNekid() {
  sendEvent('profile', 'nekidBtn');
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  var aLinks = getElementsByTagName('a', profileBlock);
  Array.prototype.forEach.call(aLinks, removeItem);
}

function makeButton() {
  var nekidDiv = createDiv({className: 'fshCenter'});
  var theBtn = createButton({
    className: 'fshBl fshBls',
    textContent: 'Nekid'
  });
  insertTextBeforeEnd(nekidDiv, '[ ');
  insertElement(nekidDiv, theBtn);
  insertTextBeforeEnd(nekidDiv, ' ]');
  on(theBtn, 'click', getNekid);
  return nekidDiv;
}

export default function nekidBtn() {
  var profileRightColumn = getElementById('profileRightColumn');
  profileCombatSetDiv = getElementById('profileCombatSetDiv');
  var targetBr = profileCombatSetDiv.parentNode.nextElementSibling;
  var nekidDiv = makeButton();
  profileRightColumn.replaceChild(nekidDiv, targetBr);
}

