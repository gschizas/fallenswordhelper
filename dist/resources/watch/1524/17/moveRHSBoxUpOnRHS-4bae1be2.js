import { x as getElementById, bX as pCR } from './calfSystem-f6498976.js';
import './insertElementBefore-c846c522.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-af2558e9.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-4bae1be2.js.map
