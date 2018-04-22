import {afterUpdateActionList} from '../doNotKill';
import calf from '../../support/calf';
import insertElement from '../../common/insertElement';
import setValue from '../../system/setValue';
import {createButton, createDiv} from '../../common/cElement';

var creatureBody;
var dnkName;
var doNotKillBtn;

function getCreatureBody(dialogViewCreature) {
  if (!creatureBody) {
    var bodyCollection = dialogViewCreature.getElementsByClassName('body');
    if (bodyCollection.length === 1) {
      creatureBody = bodyCollection[0];
    }
  }
}

function doNotKillText() {
  if (calf.doNotKillList.includes(dnkName)) {
    return 'Remove from do not kill list';
  }
  return 'Add to the do not kill list';
}

function addRemoveCreature() {
  var index = calf.doNotKillList.indexOf(dnkName);
  if (index === -1) {
    calf.doNotKillList.push(dnkName);
  } else {
    calf.doNotKillList.splice(index, 1);
  }
  doNotKillBtn.textContent = doNotKillText();
  setValue('doNotKillList', calf.doNotKillList.join());
  afterUpdateActionList(); // refresh the action list
}

function makeDnkBtn() {
  doNotKillBtn = createButton({
    className: 'fshBl',
    textContent: doNotKillText(),
    type: 'button'
  });
  var btnContainer = createDiv({
    className: 'description',
    innerHTML: '<span class="ui-helper-hidden-accessible">' +
      '<input type="text"></span>'
  });
  insertElement(btnContainer, doNotKillBtn);
  insertElement(creatureBody, btnContainer);
  doNotKillBtn.addEventListener('click', addRemoveCreature);
}

function doNotKillLink() {
  if (!doNotKillBtn) {
    makeDnkBtn();
  } else {
    doNotKillBtn.textContent = doNotKillText();
  }
}

export default function makeDoNotKillLink(thisName, dialogViewCreature) {
  getCreatureBody(dialogViewCreature);
  if (creatureBody) {
    dnkName = thisName;
    doNotKillLink();
  }
}
