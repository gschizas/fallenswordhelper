import daUnequipItem from '../_dataAccess/daUnequipItem';
import getArrayByTagName from '../common/getArrayByTagName';
import {getElementById} from '../common/getElement';
import insertElement from '../common/insertElement';
import insertTextBeforeEnd from '../common/insertTextBeforeEnd';
import on from '../common/on';
import partial from '../common/partial';
import {sendEvent} from '../support/fshGa';
import {createButton, createDiv} from '../common/cElement';

var profileCombatSetDiv;

function clearBox(link, json) {
  if (json.s) {
    link.parentNode.innerHTML = '';
  }
}

function removeItem(link) {
  var item = /inventory_id=(\d+)/.exec(link.href)[1];
  if (item) {
    daUnequipItem(item).then(partial(clearBox, link));
  }
}

function getNekid() {
  sendEvent('profile', 'nekidBtn');
  var profileBlock = profileCombatSetDiv.nextElementSibling;
  getArrayByTagName('a', profileBlock).forEach(removeItem);
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

