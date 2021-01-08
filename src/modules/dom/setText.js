export default function setText(text, ctx) {
  if (ctx instanceof Node) {
    ctx.textContent = String(text);
  }
}
