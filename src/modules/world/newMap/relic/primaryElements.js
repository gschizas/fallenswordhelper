import doBuffLinks from '../../../common/doBuffLinks';
import {getElementById} from '../../../common/getElement';
import insertElement from '../../../common/insertElement';
import {createButton, createDiv} from '../../../common/cElement';

export var containerDiv;
export var leftDiv;
export var fetchStatsBtn;
export var myDefenders;

function defendersSetup(relicData) {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
}

function containerSetup() {
  if (containerDiv) {
    containerDiv.innerHTML = '';
  } else {
    containerDiv = createDiv({className: 'body'});
  }
}

function makeLeftDiv(relicData) {
  leftDiv = createDiv({className: 'fshFloatLeft fshRelicLeftDiv'});
  insertElement(containerDiv, leftDiv);
  if (relicData.is_owner) {
    insertElement(leftDiv, doBuffLinks(myDefenders));
  }
  fetchStatsBtn = createButton({
    className: 'custombutton',
    textContent: 'Fetch Stats'
  });
  insertElement(leftDiv, fetchStatsBtn);
}

export function primaryElementsSetup(relicData) {
  defendersSetup(relicData);
  containerSetup();
  makeLeftDiv(relicData);
  var dialogRelic = getElementById('dialog-relic');
  insertElement(dialogRelic, containerDiv);
}
