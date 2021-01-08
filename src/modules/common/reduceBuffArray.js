function pair(acc, curr) {
  acc[curr.name] = Number(curr.level);
  return acc;
}

export default function reduceBuffArray(buffAry) {
  return buffAry.reduce(pair, {});
}
