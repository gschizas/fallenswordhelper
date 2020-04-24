export default function setInnerHtml(html, element) {
  if (element instanceof Element) {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = String(html);
  }
}
