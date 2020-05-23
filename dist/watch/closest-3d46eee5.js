function closest(tag, el) {
  if (el.tagName === tag) { return el; }
  return closest(tag, el.parentNode);
}

export { closest as c };
//# sourceMappingURL=closest-3d46eee5.js.map
