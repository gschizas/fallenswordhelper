import { x as getElementById, bY as pCR } from './calfSystem-6e4b53e3.js';
import './insertElementBefore-6a4c4d6a.js';
import { i as insertElementAfterBegin } from './insertElementAfterBegin-b543ce37.js';

function moveRHSBoxUpOnRHS(title) {
  const box = getElementById(title);
  if (box) {
    insertElementAfterBegin(pCR, box);
  }
}

export default moveRHSBoxUpOnRHS;
//# sourceMappingURL=moveRHSBoxUpOnRHS-5f5b710c.js.map
