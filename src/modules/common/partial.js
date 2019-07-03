export default function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}
