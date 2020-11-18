import { y as getElementById, bR as pCR } from './calfSystem-b31646eb.js';
import './insertElementBefore-7e0a7ce8.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-722ddd8b.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-f25e6539.js.map
