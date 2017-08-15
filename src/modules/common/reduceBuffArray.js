export default function reduceBuffArray(buffAry) {
  return buffAry.reduce(function(prev, curr) {
    prev[curr.name] = Number(curr.level);
    return prev;
  }, {});
}
