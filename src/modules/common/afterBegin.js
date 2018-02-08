export default function afterBegin(parentNode, newNode) {
  if (parentNode instanceof Element) {
    parentNode.insertBefore(newNode, parentNode.firstChild);
  }
}
