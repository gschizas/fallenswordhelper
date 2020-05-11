function closest(tag, el) {
  if (el.tagName === tag) { return el; }
  return closest(tag, el.parentNode);
}

export { closest as c };
//# sourceMappingURL=closest-114abad3.js.map
