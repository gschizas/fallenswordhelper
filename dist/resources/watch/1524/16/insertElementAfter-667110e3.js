import { i as insertElement } from './calfSystem-6e4b53e3.js';
import { i as insertElementBefore } from './insertElementBefore-6a4c4d6a.js';

function refIsLast(newNode, referenceNode) {
  if (referenceNode.nextSibling instanceof Node) { // Text Node
    return insertElementBefore(newNode, referenceNode.nextSibling); // Text Node
  }
  return insertElement(referenceNode.parentNode, newNode);
}

function insertElementAfter(newNode, referenceNode) {
  if (referenceNode instanceof Node
      && referenceNode.parentNode instanceof Node) {
    return refIsLast(newNode, referenceNode);
  }
}

export { insertElementAfter as i };
//# sourceMappingURL=insertElementAfter-667110e3.js.map
