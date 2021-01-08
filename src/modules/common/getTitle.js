export default function getTitle(el) {
  return el.getAttribute('oldtitle') || el.getAttribute('title');
}
