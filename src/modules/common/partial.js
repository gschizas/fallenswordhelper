export default function partial(fn, ...outer) {
  return (...inner) => fn(...outer, ...inner);
}
