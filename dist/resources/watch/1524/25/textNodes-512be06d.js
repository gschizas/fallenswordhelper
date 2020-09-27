function textNodes(node) {
  if (node instanceof Node) {
    return node.nodeType === Node.TEXT_NODE;
  }
}

export { textNodes as t };
//# sourceMappingURL=textNodes-512be06d.js.map
