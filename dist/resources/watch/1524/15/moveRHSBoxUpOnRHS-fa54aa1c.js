import { x as getElementById, c0 as pCR } from './calfSystem-b469667c.js';
import './insertElementBefore-26cea2a0.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-f1cecd09.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-fa54aa1c.js.map
