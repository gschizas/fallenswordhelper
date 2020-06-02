import { i as insertElement } from './calfSystem-f6498976.js';
import { i as insertElementBefore } from './insertElementBefore-c846c522.js';

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
//# sourceMappingURL=insertElementAfterBegin-af2558e9.js.map
