import { y as getElementById, bM as pCR } from './calfSystem-e64be67d.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-bc928e13.js';
import './insertElementBefore-aa28f497.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-d8b49369.js.map
