import { i as insertElement } from './calfSystem-b469667c.js';
import { i as insertElementBefore } from './insertElementBefore-26cea2a0.js';

function noChildren(parentNode, newNode) {
  if (parentNode.firstChild instanceof Node) { // Text Node
    return insertElementBefore(newNode, parentNode.firstChild); // Text Node
  }
  return insertElement(parentNode, newNode);
}

function insertElementAfterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    return noChildren(parentNode, newNode);
  }
}

export { insertElementAfterBegin as i };
//# sourceMappingURL=insertElementAfterBegin-f1cecd09.js.map
