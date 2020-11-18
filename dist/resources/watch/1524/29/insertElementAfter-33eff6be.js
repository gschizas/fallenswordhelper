import { i as insertElement } from './calfSystem-b31646eb.js';
import { i as insertElementBefore } from './insertElementBefore-7e0a7ce8.js';

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
//# sourceMappingURL=insertElementAfter-33eff6be.js.map
