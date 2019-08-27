import {cdn} from '../system/system';
import createPotionFromTemplate from '../ajax/createPotionFromTemplate';
import {def_needToCompose} from '../support/constants';
import getRandomInt from '../system/getRandomInt';
import partial from '../common/partial';
import {publish} from '../support/pubsub';
import querySelectorAll from '../common/querySelectorAll';
import setValue from '../system/setValue';

function randomBackgroundImage() {
  return 'url(' + cdn + 'composing/' +
    getRandomInt(1, 11) + '_' + getRandomInt(1, 51) + '.png)';
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
  var openTemplates = querySelectorAll(
    '[id|="composing-template"]:not(#composing-template-multi)');
  if (openTemplates.length === 0) {
    setValue(def_needToCompose, false);
  }
}

function createSuccess(temp) {
  var myParent = temp.parentNode;
  if (!myParent) {return;}
  myParent.innerHTML = '<div class="fshScs">Success</div>';
  updateInfoDiv(myParent.previousElementSibling.previousElementSibling,
    temp[temp.selectedIndex].text);
  amILast();
}

function potionDone(temp, data) {
  var resultNode = temp.parentNode;
  if (!resultNode) {return;}
  if (data.error) {
    resultNode.innerHTML = '<div class="fshScs">' +
      data.error + '</div>';
  } else {
    createSuccess(temp);
  }
}

function createPotion(temp) { // jQuery.min
  createPotionFromTemplate(temp.value).then(partial(potionDone, temp));
  // setTimeout(partial(potionDone, temp, {}, 'faked'), 200);
}

export default function backgroundCreate(self, temp) {
  self.innerHTML = '';
  self.classList.add('fshSpinner', 'fshSpinner12', 'fshComposingSpinner');
  createPotion(temp);
  publish('quickcreate');
}
