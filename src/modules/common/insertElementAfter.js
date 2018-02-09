export default function insertElementAfter(newNode, referenceNode) {
  if (referenceNode instanceof Node &&
      referenceNode.parentNode instanceof Node) {
    return referenceNode.parentNode.insertBefore(newNode,
      referenceNode.nextSibling);
  }
}
