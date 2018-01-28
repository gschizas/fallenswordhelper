import {doBuffLinks} from '../../support/layout';
import {getElementById} from '../../common/getElement';
import {getStats} from './relic';
import {myDefenders} from './myDefenders';
import {createButton, createDiv} from '../../common/cElement';

export var containerDiv;
export var leftDiv;
export var fetchStatsBtn;

export function primaryElementsSetup(relicData) {
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
  fetchStatsBtn.addEventListener('click', getStats);
  leftDiv.appendChild(fetchStatsBtn);
  var dialogRelic = getElementById('dialog-relic');
  dialogRelic.appendChild(containerDiv);
}
