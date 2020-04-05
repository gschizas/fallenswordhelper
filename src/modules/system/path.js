import fallback from './fallback';
import isObject from '../common/isObject';
import isUndefined from '../common/isUndefined';

function getPath(obj, aPath, def) {
  let _obj = obj;
  const _path = aPath.split('.');
  const len = _path.length;
  for (let i = 0; i < len; i += 1) {
    // if (fallback(!_obj, typeof _obj !== 'object')) {return def;}
    if (fallback(!_obj, !isObject(_obj))) { return def; }
    _obj = _obj[_path[i]];
  }
  return _obj;
}

export default function path(obj, aPath, def) {
  const _obj = getPath(obj, aPath, def);
  if (isUndefined(_obj)) { return def; }
  return _obj;
}
