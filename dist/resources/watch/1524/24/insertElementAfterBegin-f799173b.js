import { i as insertElement } from './calfSystem-dea093d3.js';
import { i as insertElementBefore } from './insertElementBefore-2ad05963.js';

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
//# sourceMappingURL=insertElementAfterBegin-f799173b.js.map
