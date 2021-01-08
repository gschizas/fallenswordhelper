export default function getText(node) {
  if (node instanceof Node) {
    return node.textContent;
  }
}
