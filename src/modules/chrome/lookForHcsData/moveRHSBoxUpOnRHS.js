import getElementById from '../../common/getElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import { pCR } from '../../support/layout';

export default function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}
