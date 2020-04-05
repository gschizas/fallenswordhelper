import infoBoxFrom from '../common/InfoBoxFrom';

export function ajaxResult(html) {
  const info = infoBoxFrom(html);
  let _r = 1;
  if (info.includes('successfully')) { _r = 0; }
  return { r: _r, m: info };
}
