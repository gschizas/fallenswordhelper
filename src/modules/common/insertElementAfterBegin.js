export default function insertElementAfterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    parentNode.insertBefore(newNode, parentNode.firstChild);
  }
}
