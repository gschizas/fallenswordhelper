export default function closest(tag, el) {
  if (el.tagName === tag) { return el; }
  return closest(tag, el.parentNode);
}
