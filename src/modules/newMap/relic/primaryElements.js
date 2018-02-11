import doBuffLinks from '../../common/doBuffLinks';
import {getElementById} from '../../common/getElement';
import {createButton, createDiv} from '../../common/cElement';

export var containerDiv;
export var leftDiv;
export var fetchStatsBtn;
export var myDefenders;

export function defendersSetup(relicData) {
  myDefenders = relicData.defenders.map(function(x) {
    return x.player_name;
  });
}

export function primaryElementsSetup(relicData) {
  defendersSetup(relicData);
  if (containerDiv) {
    containerDiv.innerHTML = '';
  } else {
    containerDiv = createDiv({className: 'body'});
  }
  leftDiv = createDiv({className: 'fshFloatLeft fshRelicLeftDiv'});
  containerDiv.appendChild(leftDiv);
  if (relicData.is_owner) {
    leftDiv.appendChild(doBuffLinks(myDefenders));
  }
  fetchStatsBtn = createButton({
    className: 'custombutton',
    textContent: 'Fetch Stats'
  });
  leftDiv.appendChild(fetchStatsBtn);
  var dialogRelic = getElementById('dialog-relic');
  dialogRelic.appendChild(containerDiv);
}
