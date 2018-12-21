export default function chunk(size, ary) {
  var ret = [];
  for (var i = 0; i < ary.length; i += size) {
    ret.push(ary.slice(i, i + size));
  }
  return ret;
}
