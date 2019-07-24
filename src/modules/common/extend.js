import isObject from './isObject';
import {keys} from './keys';
import partial from './partial';

function overwriteKey(obj, mixins, fn, key) {
  if (isObject(mixins[key]) && mixins[key] !== null) {
    obj[key] = fn(mixins[key].constructor(), mixins[key]);
  } else {
    obj[key] = mixins[key];
  }
}

export default function extend(obj, mixins) {
  if (isObject(mixins)) {
    keys(mixins).forEach(partial(overwriteKey, obj, mixins, extend));
  }
  return obj;
}
