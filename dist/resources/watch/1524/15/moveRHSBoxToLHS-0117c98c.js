import { x as getElementById, i as insertElement, c1 as pCL } from './calfSystem-b469667c.js';

function moveRHSBoxToLHS(title) {
  const boxDiv = getElementById(title);
  if (boxDiv) {
    boxDiv.classList.add('pCR');
    insertElement(pCL, boxDiv);
  }
}

export default moveRHSBoxToLHS;
//# sourceMappingURL=moveRHSBoxToLHS-0117c98c.js.map
