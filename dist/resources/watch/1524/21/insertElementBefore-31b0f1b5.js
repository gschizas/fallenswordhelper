function validRef(referenceNode) {
  return referenceNode instanceof Node
    && referenceNode.parentNode instanceof Node;
}

function insertElementBefore(newNode, referenceNode) {
  if (validRef(referenceNode)) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode);
  }
}

export { insertElementBefore as i };
//# sourceMappingURL=insertElementBefore-31b0f1b5.js.map
