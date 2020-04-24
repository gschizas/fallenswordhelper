function pair(acc, curr) {
  acc[curr.name] = Number(curr.level);
  return acc;
}

function reduceBuffArray(buffAry) {
  return buffAry.reduce(pair, {});
}

export { reduceBuffArray as r };
//# sourceMappingURL=reduceBuffArray-80c17a0b.js.map
