export default function textContent(node) {
  if (node instanceof Node) {
    return node.textContent;
  }
}
