import afterBegin from '../common/afterBegin';
import calf from '../support/calf';
import {createDiv} from '../common/cElement';
import {pCR} from '../support/layout';

export var bountyListDiv;
export var wantedListDiv;

function createMiniBox() {
  return createDiv({className: 'minibox'});
}

export function createDivs() {
  if (calf.enableWantedList) {
    wantedListDiv = createMiniBox();
    afterBegin(pCR, wantedListDiv);
  }
  if (calf.enableActiveBountyList) {
    bountyListDiv = createMiniBox();
    afterBegin(pCR, bountyListDiv);
  }
}
