import fallback from './fallback';
import isObject from '../common/isObject';
import isUndefined from '../common/isUndefined';

function getPath(obj, aPath, def) {
  var _obj = obj;
  var _path = aPath.split('.');
  var len = _path.length;
  for (var i = 0; i < len; i += 1) {
    // if (fallback(!_obj, typeof _obj !== 'object')) {return def;}
    if (fallback(!_obj, !isObject(_obj))) {return def;}
    _obj = _obj[_path[i]];
  }
  return _obj;
}

export default function path(obj, aPath, def) {
  var _obj = getPath(obj, aPath, def);
  if (isUndefined(_obj)) {return def;}
  return _obj;
}
