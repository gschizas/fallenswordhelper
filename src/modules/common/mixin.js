import entries from './entries';
import isObject from './isObject';
import partial from './partial';

function mutate(fn, obj, arr) {
  if (isObject(arr[1]) && arr[1] !== null) {
    fn(obj[arr[0]], arr[1]);
  } else {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    obj[arr[0]] = arr[1];
  }
}

export default function mixin(obj, mixins) {
  entries(mixins).forEach(partial(mutate, mixin, obj));
}
