import { i as insertElement } from './calfSystem-b0234231.js';
import { i as insertElementBefore } from './insertElementBefore-31b0f1b5.js';

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
//# sourceMappingURL=insertElementAfter-e7627fa1.js.map
