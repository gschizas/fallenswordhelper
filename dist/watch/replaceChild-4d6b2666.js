function replaceChild(newChild, oldChild) {
  if (newChild instanceof Node && oldChild instanceof Node) {
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }
  return oldChild;
}

export { replaceChild as r };
//# sourceMappingURL=replaceChild-4d6b2666.js.map
