import { y as getElementById, bR as pCR } from './calfSystem-d357ca6f.js';
import './insertElementBefore-1b96a575.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-0f4ef756.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-68296773.js.map
