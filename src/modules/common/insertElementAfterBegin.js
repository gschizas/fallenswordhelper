import insertElement from './insertElement';
import insertElementBefore from './insertElementBefore';

function noChildren(parentNode, newNode) {
  if (parentNode.firstChild instanceof Node) {
    return insertElementBefore(newNode, parentNode.firstChild);
  }
  return insertElement(parentNode, newNode);
}

export default function insertElementAfterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    return noChildren(parentNode, newNode);
  }
}
