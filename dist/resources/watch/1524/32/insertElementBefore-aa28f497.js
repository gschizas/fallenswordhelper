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
//# sourceMappingURL=insertElementBefore-aa28f497.js.map
