import getElementById from '../../common/getElement';
import insertElement from '../../common/insertElement';
import { pCL } from '../../support/layout';

export default function moveRHSBoxToLHS(title) {
  const boxDiv = getElementById(title);
  if (boxDiv) {
    boxDiv.classList.add('pCR');
    insertElement(pCL, boxDiv);
  }
}
