import {getElementById} from '../common/getElement';
import {sendEvent} from '../support/fshGa';
import unequipitem from '../app/profile/unequipitem';
import {createButton, createDiv} from '../common/cElement';

var profileCombatSetDiv;

function getNekid() {
  sendEvent('profile', 'nekidBtn');
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  var aLinks = profileBlock.getElementsByTagName('a');
  Array.prototype.forEach.call(aLinks, function(link) {
    var item = /inventory_id=(\d+)/.exec(link.href)[1];
    if (item) {
      unequipitem(item).done(function(json) {
        if (json.s) {link.parentNode.innerHTML = '';}
      });
    }
  });
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
  nekidDiv.insertAdjacentText('beforeend', '[ ');
  nekidDiv.insertAdjacentElement('beforeend', theBtn);
  nekidDiv.insertAdjacentText('beforeend', ' ]');
  profileRightColumn.replaceChild(nekidDiv, targetBr);
  theBtn.addEventListener('click', getNekid);
}

