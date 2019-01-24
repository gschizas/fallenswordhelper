import isObject from './isObject';

export default function mixin(obj, mixins) {
  Object.keys(mixins).forEach(function(key) {
    if (isObject(mixins[key]) && mixins[key] !== null) {
      mixin(obj[key], mixins[key]);
    } else {
      obj[key] = mixins[key];
    }
  });
}
