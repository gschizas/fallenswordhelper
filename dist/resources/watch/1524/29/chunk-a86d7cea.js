function chunk(size, ary) {
  const ret = [];
  for (let i = 0; i < ary.length; i += size) {
    ret.push(ary.slice(i, i + size));
  }
  return ret;
}

export { chunk as c };
//# sourceMappingURL=chunk-a86d7cea.js.map
