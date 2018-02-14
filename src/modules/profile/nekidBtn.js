import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import insertTextBeforeEnd from '../common/insertTextBeforeEnd';
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
  var aLinks = profileBlock.getElementsByTagName('a');
  Array.prototype.forEach.call(aLinks, removeItem);
}

export default function nekidBtn() {
  var profileRightColumn = getElementById('profileRightColumn');
  profileCombatSetDiv = getElementById('profileCombatSetDiv');
  var targetBr = profileCombatSetDiv.parentNode.nextElementSibling;
  var nekidDiv = createDiv({className: 'fshCenter'});
  var theBtn = createButton({
    className: 'fshBl fshBls',
    textContent: 'Nekid'
  });
  insertTextBeforeEnd(nekidDiv, '[ ');
  insertElement(nekidDiv, theBtn);
  insertTextBeforeEnd(nekidDiv, ' ]');
  profileRightColumn.replaceChild(nekidDiv, targetBr);
  theBtn.addEventListener('click', getNekid);
}

