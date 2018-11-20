import insertElementBefore from './insertElementBefore';

export default function insertElementAfter(newNode, referenceNode) {
  if (referenceNode instanceof Node &&
      referenceNode.parentNode instanceof Node) {
    return insertElementBefore(newNode, referenceNode.nextSibling);
  }
}
