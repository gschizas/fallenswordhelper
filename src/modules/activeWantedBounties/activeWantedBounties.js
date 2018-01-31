import calf from '../support/calf';
import {createDiv} from '../common/cElement';
import {pCR} from '../support/layout';
import {retrieveBountyInfo} from './retrieveBountyInfo';

export var bountyListDiv;
export var wantedListDiv;

function createMiniBox() {
  return createDiv({className: 'minibox'});
}

export function prepareBountyData() {
  if (calf.enableWantedList) {
    wantedListDiv = createMiniBox();
    pCR.insertAdjacentElement('afterbegin', wantedListDiv);
  }
  if (calf.enableActiveBountyList) {
    bountyListDiv = createMiniBox();
    pCR.insertAdjacentElement('afterbegin', bountyListDiv);
  }
  retrieveBountyInfo(calf.enableActiveBountyList, calf.enableWantedList);
}
