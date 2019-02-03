function pair(prev, curr) {
  prev[curr.name] = Number(curr.level);
  return prev;
}

export default function reduceBuffArray(buffAry) {
  return buffAry.reduce(pair, {});
}
