function getPos(available, desired, offset) {
  return Math.floor(Math.max(available - desired, 0) / 2 + offset);
}

export default function fshOpen(url, title, w, _h, features) {
  var h = _h;
  if (_h === 500) {h = 1000;}
  var top = getPos(window.screen.availHeight, h, window.screenY);
  var left = getPos(document.documentElement.clientWidth, w, window.screenX);
  window.open(url, title, 'width=' + w + ', height=' + h + ', left=' + left +
    ', top=' + top + features);
}
