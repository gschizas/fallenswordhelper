export default function setInnerHtml(html, ctx) {
  if (ctx instanceof Element) {
    ctx.innerHTML = String(html);
  }
}
