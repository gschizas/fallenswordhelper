import infoBoxFrom from '../common/InfoBoxFrom';

export function ajaxResult(html) {
  var info = infoBoxFrom(html);
  var _r = 1;
  if (info.includes('successfully')) {_r = 0;}
  return {r: _r, m: info};
}
