import calf from '../../support/calf';
import createDiv from '../../common/cElement/createDiv';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import { pCR } from '../../support/layout';

export let bountyListDiv;
export let wantedListDiv;

function createMiniBox() {
  return createDiv({ className: 'minibox' });
}

export function createDivs() {
  if (calf.enableWantedList) {
    wantedListDiv = createMiniBox();
    insertElementAfterBegin(pCR, wantedListDiv);
  }
  if (calf.enableActiveBountyList) {
    bountyListDiv = createMiniBox();
    insertElementAfterBegin(pCR, bountyListDiv);
  }
}
