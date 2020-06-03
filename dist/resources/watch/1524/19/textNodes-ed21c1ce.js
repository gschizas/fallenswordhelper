function textNodes(node) {
  if (node instanceof Node) {
    return node.nodeType === Node.TEXT_NODE;
  }
}

export { textNodes as t };
//# sourceMappingURL=textNodes-ed21c1ce.js.map
