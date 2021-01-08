export default function chunk(size, ary) {
  const ret = [];
  for (let i = 0; i < ary.length; i += size) {
    ret.push(ary.slice(i, i + size));
  }
  return ret;
}
