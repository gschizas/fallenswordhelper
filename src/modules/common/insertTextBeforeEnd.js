export default function insertTextBeforeEnd(parent, text) {
  if (parent instanceof Element) {
    parent.insertAdjacentHTML('beforeend', text);
  }
}
