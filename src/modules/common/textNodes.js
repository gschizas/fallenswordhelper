export default function textNodes(node) {
  if (node instanceof Node) {
    return node.nodeType === Node.TEXT_NODE;
  }
}
