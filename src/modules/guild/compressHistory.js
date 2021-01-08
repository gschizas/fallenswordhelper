import compressBio from '../profile/bio/compressBio';
import createDiv from '../common/cElement/createDiv';
import { defTable } from '../support/constants';
import getArrayByTagName from '../common/getArrayByTagName';
import insertElement from '../common/insertElement';
import { pCC } from '../support/layout';
import setInnerHtml from '../dom/setInnerHtml';

export default function compressHistory() {
  const thisCell = getArrayByTagName(defTable, pCC).slice(-2, -1)[0]
    .rows[0].cells[0];
  const newDiv = createDiv({
    id: 'profile-bio',
    innerHTML: thisCell.innerHTML,
  });
  setInnerHtml('', thisCell);
  insertElement(thisCell, newDiv);
  compressBio();
}
