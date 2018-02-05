export default function padZ(n) {
  var ret = n.toString();
  if (n < 10) {ret = '0' + ret;}
  return ret;
}
