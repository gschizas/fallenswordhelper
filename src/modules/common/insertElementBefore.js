export default function insertElementBefore(newNode, referenceNode) {
  if (referenceNode instanceof Node &&
      referenceNode.parentNode instanceof Node) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode);
  }
}
