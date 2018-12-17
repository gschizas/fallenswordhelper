import createPotionFromTemplate from '../ajax/createPotionFromTemplate';
import {def_needToCompose} from '../support/constants';
import getRandomInt from '../system/getRandomInt';
import {imageServer} from '../system/system';
import partial from '../common/partial';
import {publish} from '../support/pubsub';
import setValue from '../system/setValue';

function randomBackgroundImage() {
  return 'url(' + imageServer + '/composing/potions/' +
    getRandomInt(1, 11) + '_' + getRandomInt(1, 51) + '.gif)';
}

function updateInfoDiv(infoDiv, potName) {
  infoDiv.children[0].innerHTML = '';
  infoDiv.children[0].classList.add('fshPot');
  infoDiv.children[0].style.backgroundImage = randomBackgroundImage();
  infoDiv.children[2].innerHTML = 'Creating \'<span class="fshBold">' +
    potName + '</span>\' Potion';
  infoDiv.children[3].innerHTML = '';
}

function amILast() {
  var openTemplates = document.querySelectorAll(
    '[id|="composing-template"]:not(#composing-template-multi)');
  if (openTemplates.length === 0) {
    setValue(def_needToCompose, false);
  }
}

function createSuccess(temp, textStatus) {
  var myParent = temp.parentNode;
  if (!myParent) {return;}
  myParent.innerHTML = '<div class="fshScs">' + textStatus + '</div>';
  updateInfoDiv(myParent.previousElementSibling.previousElementSibling,
    temp[temp.selectedIndex].text);
  amILast();
}

function potionDone(temp, data, textStatus) {
  var resultNode = temp.parentNode;
  if (!resultNode) {return;}
  if (data.error) {
    resultNode.innerHTML = '<div class="fshScs">' +
      data.error + '</div>';
  } else {
    createSuccess(temp, textStatus);
  }
}

function createPotion(temp) { // jQuery.min
  createPotionFromTemplate(temp.value).done(partial(potionDone, temp));
  // setTimeout(partial(potionDone, temp, {}, 'faked'), 200);
}

export default function backgroundCreate(self, temp) {
  self.innerHTML = '';
  self.classList.add('fshSpinner', 'fshSpinner12', 'fshComposingSpinner');
  createPotion(temp);
  publish('quickcreate');
}
