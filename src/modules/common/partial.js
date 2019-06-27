import {arrayFrom} from './arrayFrom';

export default function partial(fn /* , rest args */) {
  return fn.bind.apply(fn, arrayFrom(arguments));
}
