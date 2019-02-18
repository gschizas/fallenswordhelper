export default function splitTime(timeInSecs) {
  var s = timeInSecs;
  var m = Math.floor(s / 60);
  s %= 60;
  var h = Math.floor(m / 60);
  m %= 60;
  var d = Math.floor(h / 24);
  h %= 24;
  return [d, h, m, s];
}
