export default function setText(text, node) {
  if (node instanceof Node) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = String(text);
  }
}
