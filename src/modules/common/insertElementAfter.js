import insertElement from './insertElement';
import insertElementBefore from './insertElementBefore';

function refIsLast(newNode, referenceNode) {
  if (referenceNode.nextSibling instanceof Node) {
    return insertElementBefore(newNode, referenceNode.nextSibling);
  }
  return insertElement(referenceNode.parentNode, newNode);
}

export default function insertElementAfter(newNode, referenceNode) {
  if (referenceNode instanceof Node &&
      referenceNode.parentNode instanceof Node) {
    return refIsLast(newNode, referenceNode);
  }
}
