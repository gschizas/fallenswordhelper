function textNodes(node) {
  if (node instanceof Node) {
    return node.nodeType === Node.TEXT_NODE;
  }
}

export { textNodes as t };
//# sourceMappingURL=textNodes-179114f5.js.map
