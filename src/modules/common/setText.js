export default function setText(text, node) {
  if (node instanceof Node) {
    node.textContent = String(text);
  }
}
