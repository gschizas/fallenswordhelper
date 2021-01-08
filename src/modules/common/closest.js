export default function closest(selector, el) {
  if (el instanceof Element) {
    return el.closest(selector);
  }
}
