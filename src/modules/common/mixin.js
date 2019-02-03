import isObject from './isObject';
import partial from './partial';

function mutate(fn, obj, arr) {
  if (isObject(arr[1]) && arr[1] !== null) {
    fn(obj[arr[0]], arr[1]);
  } else {
    obj[arr[0]] = arr[1];
  }
}

export default function mixin(obj, mixins) {
  Object.entries(mixins).forEach(partial(mutate, mixin, obj));
}
