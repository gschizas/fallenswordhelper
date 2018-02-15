import isObject from './isObject';

export default function extend(obj, mixins) {
  Object.keys(mixins).forEach(function(key) {
    if (isObject(mixins[key]) && mixins[key] !== null) {
      obj[key] = extend(mixins[key].constructor(), mixins[key]);
    } else {
      obj[key] = mixins[key];
    }
  });
  return obj;
}
