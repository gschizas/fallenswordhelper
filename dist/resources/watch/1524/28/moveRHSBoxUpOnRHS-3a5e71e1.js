import { y as getElementById, bR as pCR } from './calfSystem-21d16a0e.js';
import './insertElementBefore-eada6f05.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-6a4e1b31.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-3a5e71e1.js.map
