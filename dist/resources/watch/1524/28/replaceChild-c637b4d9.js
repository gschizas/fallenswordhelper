function replaceChild(newChild, oldChild) {
  if (newChild instanceof Node && oldChild instanceof Node) {
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }
  return oldChild;
}

export { replaceChild as r };
//# sourceMappingURL=replaceChild-c637b4d9.js.map
