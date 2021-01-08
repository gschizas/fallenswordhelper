export default function insertHtml(parent, where, html) {
  if (parent instanceof Element) {
    parent.insertAdjacentHTML(where, html);
  }
}
