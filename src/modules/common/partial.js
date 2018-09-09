export default function partial(fn /* , rest args */) {
  return fn.bind.apply(fn, Array.from(arguments));
}
